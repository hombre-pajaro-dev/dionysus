// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { createSession } from '@/modules/auth'

declare module '../support/world' {
  interface DionysusWorld {
    cashierVenueId: string
    cashierMemberUserId: string
    cashierMemberMembershipId: string
    cashierSessionToken: string
    cashierNoRoleSessionToken: string
  }
}

async function getLookupRoute() {
  const mod = await import('@/app/api/members/lookup/route')
  return mod.GET
}
async function getTopupRoute() {
  const mod = await import('@/app/api/balance/topup/route')
  return mod.POST
}
async function getMembershipsRoute() {
  const mod = await import('@/app/api/memberships/route')
  return mod.GET
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue de prueba para cajero con slug {string}', async function (this: DionysusWorld, slug: string) {
  const venue = await db.venue.create({
    data: { name: 'Cashier Venue', slug, visibility: 'PRIVATE' },
  })
  this.cashierVenueId = venue.id
})

Given('un miembro activo en ese venue con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Miembro Cajero' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.cashierVenueId, status: 'ACTIVE' },
  })
  this.cashierMemberUserId = user.id
  this.cashierMemberMembershipId = membership.id
})

Given('un cajero de tokens con teléfono {string} en ese venue', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Token Cashier' } })
  await db.userRole.create({
    data: { userId: user.id, role: 'TOKEN_CASHIER', venueId: this.cashierVenueId },
  })
  this.cashierSessionToken = await createSession(user.id)
})

Given('un usuario sin permisos con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Sin Permisos' } })
  this.cashierNoRoleSessionToken = await createSession(user.id)
})

Given('el cajero también es miembro de ese venue', async function (this: DionysusWorld) {
  // The cashier user is identified by cashierSessionToken — need to get their userId
  // Re-use the cashier user by adding a membership
  const roleRow = await db.userRole.findFirst({
    where: { venueId: this.cashierVenueId, role: 'TOKEN_CASHIER' },
  })
  if (!roleRow) throw new Error('No cashier role found')
  await db.membership.upsert({
    where: { userId_venueId: { userId: roleRow.userId, venueId: this.cashierVenueId } },
    update: {},
    create: { userId: roleRow.userId, venueId: this.cashierVenueId, status: 'ACTIVE' },
  })
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('el cajero busca al miembro por userId', async function (this: DionysusWorld) {
  const GET = await getLookupRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/members/lookup?userId=${this.cashierMemberUserId}&venueId=${this.cashierVenueId}`,
      { headers: { Cookie: `session=${this.cashierSessionToken}` } }
    )
  )
})

When('el cajero agrega {int} centavos al miembro', async function (this: DionysusWorld, cents: number) {
  const lookupData = await this.response!.clone().json()
  const POST = await getTopupRoute()
  this.response = await POST(
    new Request('http://localhost/api/balance/topup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.cashierSessionToken}`,
      },
      body: JSON.stringify({
        membershipId: lookupData.membershipId,
        amountCents: cents,
        concept: 'Carga de efectivo test',
      }),
    })
  )
})

When('ese usuario busca al miembro por userId', async function (this: DionysusWorld) {
  const GET = await getLookupRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/members/lookup?userId=${this.cashierMemberUserId}&venueId=${this.cashierVenueId}`,
      { headers: { Cookie: `session=${this.cashierNoRoleSessionToken}` } }
    )
  )
})

When('se busca miembro sin sesión', async function (this: DionysusWorld) {
  const GET = await getLookupRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/members/lookup?userId=${this.cashierMemberUserId}&venueId=${this.cashierVenueId}`
    )
  )
})

When('el cajero busca el userId {string}', async function (this: DionysusWorld, uid: string) {
  const GET = await getLookupRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/members/lookup?userId=${uid}&venueId=${this.cashierVenueId}`,
      { headers: { Cookie: `session=${this.cashierSessionToken}` } }
    )
  )
})

When('el cajero consulta sus membresías', async function (this: DionysusWorld) {
  const GET = await getMembershipsRoute()
  this.response = await GET(
    new Request('http://localhost/api/memberships', {
      headers: { Cookie: `session=${this.cashierSessionToken}` },
    })
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('la respuesta incluye membershipId del miembro', async function (this: DionysusWorld) {
  const data = await this.response!.clone().json()
  assert.ok(data.membershipId, `Expected membershipId in response, got: ${JSON.stringify(data)}`)
  assert.equal(data.membershipId, this.cashierMemberMembershipId)
})

Then('la respuesta incluye nombre del miembro', async function (this: DionysusWorld) {
  const data = await this.response!.clone().json()
  assert.ok(data.member?.name, `Expected member.name in response`)
})

Then('el balance del miembro es {int}', async function (this: DionysusWorld, expected: number) {
  const { db: dbMod } = await import('@/lib/db')
  const { getBalance } = await import('@/modules/balance')
  const balance = await getBalance(this.cashierMemberMembershipId)
  assert.equal(balance, expected, `Expected balance=${expected}, got=${balance}`)
})

Then('la respuesta incluye al menos una membresía con venueId del venue', async function (this: DionysusWorld) {
  const data: { id: string; venue: { id: string } }[] = await this.response!.clone().json()
  const found = data.some((m) => m.venue.id === this.cashierVenueId)
  assert.ok(found, `Expected membership for venueId=${this.cashierVenueId} in response`)
})
