// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { confirmPayment } from '@/modules/donations'
import { getBalance } from '@/modules/balance'
import { createSession } from '@/modules/auth'

async function getDonationsRoute() {
  const mod = await import('@/app/api/donations/route')
  return mod.POST
}

// Extend world for donations
declare module '../support/world' {
  interface DionysusWorld {
    eventId: string
    stripePaymentIntentId: string
    stripePaymentIntentId2: string
    membershipId2: string
    sessionToken2: string
  }
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue de prueba para donativos con un miembro activo de teléfono {string}', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
  const venue = await db.venue.create({
    data: { name: 'Donations Test Venue', slug: 'test-donations-venue', visibility: 'PRIVATE' },
  })
  this.venueId = venue.id
  const user = await db.user.create({ data: { phone, name: 'Donante Test' } })
  this.organizerUserId = user.id
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: venue.id, status: 'ACTIVE' },
  })
  this.membershipId = membership.id
  this.sessionToken = await createSession(user.id)
})

Given('un evento en ese venue con donativo mínimo de {int} centavos', async function (this: DionysusWorld, minimumDonation: number) {
  const event = await db.event.create({
    data: {
      venueId: this.venueId,
      name: 'Jam de prueba',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      minimumDonation,
      createdById: this.organizerUserId,
      visibility: 'MEMBERS_ONLY',
    },
  })
  this.eventId = event.id
})

Given('un pago pendiente de {int} centavos para ese evento en esa membresía', async function (this: DionysusWorld, amount: number) {
  const intentId = `pi_test_${Date.now()}_${Math.random().toString(36).slice(2)}`
  await db.payment.create({
    data: {
      userId: this.organizerUserId,
      membershipId: this.membershipId,
      eventId: this.eventId,
      amountCents: amount,
      provider: 'stripe',
      providerPaymentId: intentId,
      method: 'card',
      status: 'PENDING',
    },
  })
  this.stripePaymentIntentId = intentId
})

Given('un segundo miembro activo con teléfono {string} en el mismo venue', async function (this: DionysusWorld, phone: string) {
  const user2 = await db.user.create({ data: { phone, name: 'Segundo Miembro' } })
  const membership2 = await db.membership.create({
    data: { userId: user2.id, venueId: this.venueId, status: 'ACTIVE' },
  })
  this.membershipId2 = membership2.id
  this.sessionToken2 = await createSession(user2.id)
})

Given('un pago pendiente de {int} centavos del segundo miembro para ese evento', async function (this: DionysusWorld, amount: number) {
  const intentId = `pi_test_${Date.now()}_${Math.random().toString(36).slice(2)}`
  await db.payment.create({
    data: {
      userId: this.organizerUserId, // reusing for simplicity — userId is just for audit
      membershipId: this.membershipId2,
      eventId: this.eventId,
      amountCents: amount,
      provider: 'stripe',
      providerPaymentId: intentId,
      method: 'card',
      status: 'PENDING',
    },
  })
  this.stripePaymentIntentId2 = intentId
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('se confirma el pago via webhook', async function (this: DionysusWorld) {
  await confirmPayment(this.stripePaymentIntentId)
})

When('se confirma el mismo pago via webhook otra vez', async function (this: DionysusWorld) {
  await confirmPayment(this.stripePaymentIntentId)
})

When('se confirman ambos pagos via webhook', async function (this: DionysusWorld) {
  await confirmPayment(this.stripePaymentIntentId)
  await confirmPayment(this.stripePaymentIntentId2)
})

When('el miembro inicia un donativo de {int} centavos para el evento', async function (this: DionysusWorld, amount: number) {
  const POST = await getDonationsRoute()
  this.response = await POST(
    new Request('http://localhost/api/donations', {
      method: 'POST',
      body: JSON.stringify({
        membershipId: this.membershipId,
        eventId: this.eventId,
        amountCents: amount,
        method: 'card',
      }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
    })
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('el balance de la membresía es {int}', async function (this: DionysusWorld, expected: number) {
  const balance = await getBalance(this.membershipId)
  assert.equal(balance, expected)
})

Then('el balance del segundo miembro es {int}', async function (this: DionysusWorld, expected: number) {
  const balance = await getBalance(this.membershipId2)
  assert.equal(balance, expected)
})

Then('existe un acceso al evento para esa membresía', async function (this: DionysusWorld) {
  const access = await db.eventAccess.findUnique({
    where: { membershipId_eventId: { membershipId: this.membershipId, eventId: this.eventId } },
  })
  assert.ok(access, 'EventAccess no encontrado')
})

Then('la respuesta contiene un clientSecret de Stripe', async function (this: DionysusWorld) {
  const body = await this.response!.json()
  assert.ok(body.clientSecret, 'clientSecret ausente en respuesta')
})
