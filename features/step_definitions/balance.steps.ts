// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { credit } from '@/modules/balance'
import { createSession } from '@/modules/auth'
import { TransactionType } from '@prisma/client'

async function getBalanceRoute() {
  const mod = await import('@/app/api/balance/route')
  return { GET: mod.GET }
}
async function getTopupRoute() {
  const mod = await import('@/app/api/balance/topup/route')
  return mod.POST
}
async function getPosDebitRoute() {
  const mod = await import('@/app/api/pos/debit/route')
  return mod.POST
}

// ─── World extensions for balance ────────────────────────────────────────────

declare module '../support/world' {
  interface DionysusWorld {
    membershipId2: string
    cashierSessionToken: string
  }
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue de prueba con un miembro activo de teléfono {string}', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
  const venue = await db.venue.create({
    data: { name: 'Balance Test Venue', slug: 'test-balance-venue', visibility: 'PRIVATE' },
  })
  this.venueId = venue.id
  const user = await db.user.create({ data: { phone, name: 'Miembro Balance' } })
  this.organizerUserId = user.id
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: venue.id, status: 'ACTIVE' },
  })
  this.membershipId = membership.id
  this.sessionToken = await createSession(user.id)
})

Given('que el cajero agrega {int} centavos al balance del miembro', async function (this: DionysusWorld, amount: number) {
  await credit({
    membershipId: this.membershipId,
    amountCents: amount,
    concept: 'Carga de prueba',
    type: TransactionType.TOPUP,
  })
})

Given('el mismo usuario es miembro activo de un segundo venue de prueba', async function (this: DionysusWorld) {
  const venue2 = await db.venue.create({
    data: { name: 'Balance Test Venue 2', slug: 'test-balance-venue-2', visibility: 'PRIVATE' },
  })
  const membership2 = await db.membership.create({
    data: { userId: this.organizerUserId, venueId: venue2.id, status: 'ACTIVE' },
  })
  this.membershipId2 = membership2.id
})

Given('un cajero con teléfono {string} en ese venue', async function (this: DionysusWorld, phone: string) {
  const cashier = await db.user.create({ data: { phone, name: 'Cajero Test' } })
  await db.userRole.create({ data: { userId: cashier.id, role: 'TOKEN_CASHIER', venueId: this.venueId } })
  this.cashierSessionToken = await createSession(cashier.id)
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('el miembro consulta su balance', async function (this: DionysusWorld) {
  const { GET } = await getBalanceRoute()
  this.response = await GET(
    new Request(`http://localhost/api/balance?membershipId=${this.membershipId}`, {
      headers: { Cookie: `session=${this.sessionToken}` },
    })
  )
})

When('el miembro consulta su historial de transacciones', async function (this: DionysusWorld) {
  const { GET } = await getBalanceRoute()
  this.response = await GET(
    new Request(`http://localhost/api/balance?membershipId=${this.membershipId}&history=true`, {
      headers: { Cookie: `session=${this.sessionToken}` },
    })
  )
})

When('el POS debita {int} centavos del balance del miembro', async function (this: DionysusWorld, amount: number) {
  // POS route resolves membership via POS_VENUE_ID + userId from QR
  process.env.POS_VENUE_ID = this.venueId
  const POST = await getPosDebitRoute()
  this.response = await POST(
    new Request('http://localhost/api/pos/debit', {
      method: 'POST',
      body: JSON.stringify({
        qr: this.organizerUserId,
        amountCents: amount,
        concept: 'Compra test',
        transactionId: `test-tx-${Date.now()}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.POS_API_KEY ?? 'local-pos-api-key',
      },
    }) as Parameters<typeof POST>[0]
  )
})

When('el miembro consulta su balance en el segundo venue', async function (this: DionysusWorld) {
  const { GET } = await getBalanceRoute()
  this.response = await GET(
    new Request(`http://localhost/api/balance?membershipId=${this.membershipId2}`, {
      headers: { Cookie: `session=${this.sessionToken}` },
    })
  )
})

When('el cajero agrega {int} centavos via API', async function (this: DionysusWorld, amount: number) {
  const POST = await getTopupRoute()
  this.response = await POST(
    new Request('http://localhost/api/balance/topup', {
      method: 'POST',
      body: JSON.stringify({ membershipId: this.membershipId, amountCents: amount, concept: 'Carga en efectivo' }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.cashierSessionToken}`,
      },
    })
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('el balance es {int}', async function (this: DionysusWorld, expected: number) {
  const body = await this.response!.clone().json()
  assert.equal(body.balanceCents, expected)
})

Then('el balance resultante es {int}', async function (this: DionysusWorld, expected: number) {
  const { GET } = await getBalanceRoute()
  const res = await GET(
    new Request(`http://localhost/api/balance?membershipId=${this.membershipId}`, {
      headers: { Cookie: `session=${this.sessionToken}` },
    })
  )
  const body = await res.json()
  assert.equal(body.balanceCents, expected)
})

Then('el historial contiene {int} transacciones', async function (this: DionysusWorld, expectedCount: number) {
  const body = await this.response!.clone().json()
  assert.equal(body.transactions.length, expectedCount)
})

Then('el balance en el segundo venue es {int}', async function (this: DionysusWorld, expected: number) {
  const body = await this.response!.clone().json()
  assert.equal(body.balanceCents, expected)
})
