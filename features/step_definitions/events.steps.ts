// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { createSession } from '@/modules/auth'

async function getEventsRoute() {
  const mod = await import('@/app/api/events/route')
  return { GET: mod.GET, POST: mod.POST }
}
async function getEventByIdRoute() {
  const mod = await import('@/app/api/events/[id]/route')
  return { GET: mod.GET, PATCH: mod.PATCH }
}

declare module '../support/world' {
  interface DionysusWorld {
    eventId: string
    venueId2: string
    eventId2: string
    memberSessionToken: string
    memberVenueId: string
    memberMembershipId: string
    createdEventName: string
  }
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue público de prueba para eventos', async function (this: DionysusWorld) {
  const venue = await db.venue.create({
    data: { name: 'Public Events Venue', slug: 'test-events-public-venue', visibility: 'PUBLIC' },
  })
  this.venueId = venue.id
})

Given('un venue privado de prueba para eventos', async function (this: DionysusWorld) {
  const venue = await db.venue.create({
    data: { name: 'Private Events Venue', slug: 'test-events-private-venue', visibility: 'PRIVATE' },
  })
  this.venueId2 = venue.id
})

Given('un organizador con teléfono {string} en ambos venues', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Organizador Eventos' } })
  await db.userRole.createMany({
    data: [
      { userId: user.id, role: 'ORGANIZER', venueId: this.venueId },
      { userId: user.id, role: 'ORGANIZER', venueId: this.venueId2 },
    ],
  })
  this.organizerUserId = user.id
  this.sessionToken = await createSession(user.id)
})

Given('un evento público {string} en el venue público', async function (this: DionysusWorld, name: string) {
  const event = await db.event.create({
    data: {
      venueId: this.venueId,
      name,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      minimumDonation: 15000,
      createdById: this.organizerUserId,
      visibility: 'PUBLIC',
    },
  })
  this.eventId = event.id
})

Given('un evento público {string} en el venue privado', async function (this: DionysusWorld, name: string) {
  const event = await db.event.create({
    data: {
      venueId: this.venueId2,
      name,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      minimumDonation: 15000,
      createdById: this.organizerUserId,
      visibility: 'PUBLIC',
    },
  })
  this.eventId2 = event.id
})

Given('un evento con visibilidad MEMBERS_ONLY {string} en el venue privado', async function (this: DionysusWorld, name: string) {
  const event = await db.event.create({
    data: {
      venueId: this.venueId2,
      name,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      minimumDonation: 10000,
      createdById: this.organizerUserId,
      visibility: 'MEMBERS_ONLY',
    },
  })
  this.eventId2 = event.id
})

Given('un miembro activo con teléfono {string} en el venue privado', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Miembro Privado' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.venueId2, status: 'ACTIVE' },
  })
  this.memberMembershipId = membership.id
  this.memberVenueId = this.venueId2
  this.memberSessionToken = await createSession(user.id)
})


// ─── Whens ───────────────────────────────────────────────────────────────────

When('el organizador crea un evento {string} en el venue público', async function (this: DionysusWorld, name: string) {
  this.createdEventName = name
  const { POST } = await getEventsRoute()
  this.response = await POST(
    new Request('http://localhost/api/events', {
      method: 'POST',
      body: JSON.stringify({
        venueId: this.venueId,
        name,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        minimumDonation: 20000,
        visibility: 'PUBLIC',
      }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
    })
  )
})

When('cualquier persona consulta los eventos públicos', async function (this: DionysusWorld) {
  const { GET } = await getEventsRoute()
  this.response = await GET(new Request('http://localhost/api/events'))
})

When('ese miembro consulta los eventos de su venue', async function (this: DionysusWorld) {
  const { GET } = await getEventsRoute()
  this.response = await GET(
    new Request(`http://localhost/api/events?venueId=${this.memberVenueId}`, {
      headers: { Cookie: `session=${this.memberSessionToken}` },
    })
  )
})

When('el organizador cancela ese evento', async function (this: DionysusWorld) {
  const { PATCH } = await getEventByIdRoute()
  this.response = await PATCH(
    new Request(`http://localhost/api/events/${this.eventId}`, {
      method: 'PATCH',
      body: JSON.stringify({ cancelled: true }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
    }),
    { params: Promise.resolve({ id: this.eventId }) }
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('el evento existe en la base de datos', async function (this: DionysusWorld) {
  const event = await db.event.findFirst({ where: { name: this.createdEventName, venueId: this.venueId } })
  assert.ok(event, 'Evento no encontrado en DB')
})

Then('la respuesta incluye el evento {string}', async function (this: DionysusWorld, name: string) {
  const body: { name: string }[] = await this.response!.clone().json()
  const found = body.some((e) => e.name === name)
  assert.ok(found, `Evento "${name}" no encontrado en la respuesta`)
})

Then('la respuesta NO incluye el evento {string}', async function (this: DionysusWorld, name: string) {
  const body: { name: string }[] = await this.response!.clone().json()
  const found = body.some((e) => e.name === name)
  assert.ok(!found, `Evento "${name}" encontrado en la respuesta pública (no debería)`)
})

Then('el evento tiene fecha de cancelación registrada', async function (this: DionysusWorld) {
  const event = await db.event.findUnique({ where: { id: this.eventId } })
  assert.ok(event?.cancelledAt, 'cancelledAt no está registrado')
})

When('consulta el detalle de ese evento sin autenticación', async function (this: DionysusWorld) {
  const { GET } = await getEventByIdRoute()
  // Use eventId or eventId2 — prefer eventId2 if set (private venue scenarios)
  const id = this.eventId2 || this.eventId
  this.response = await GET(
    new Request(`http://localhost/api/events/${id}`),
    { params: Promise.resolve({ id }) }
  )
})

Then('la respuesta contiene el nombre del evento {string}', async function (this: DionysusWorld, name: string) {
  const data = await this.response!.clone().json()
  assert.equal(data.name, name, `Expected name="${name}", got: ${data.name}`)
})
