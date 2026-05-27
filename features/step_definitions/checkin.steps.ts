// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { createSession } from '@/modules/auth'

declare module '../support/world' {
  interface DionysusWorld {
    checkinVenueId: string
    checkinEventId: string
    checkinMemberUserId: string
    checkinMemberMembershipId: string
    checkinDoorOpSessionToken: string
    checkinNoRoleSessionToken: string
  }
}

async function getCheckinRoute() {
  const mod = await import('@/app/api/checkin/route')
  return mod.GET
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue de prueba para checkin con slug {string}', async function (this: DionysusWorld, slug: string) {
  const venue = await db.venue.create({
    data: { name: 'Door Venue', slug, visibility: 'PRIVATE' },
  })
  this.checkinVenueId = venue.id
})

Given('un evento activo en ese venue', async function (this: DionysusWorld) {
  const organizer = await db.user.create({ data: { phone: '+525500888099', name: 'Org Checkin' } })
  const event = await db.event.create({
    data: {
      venueId: this.checkinVenueId,
      name: 'Jam Test',
      date: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3h from now
      minimumDonation: 10000,
      createdById: organizer.id,
    },
  })
  this.checkinEventId = event.id
})

Given('un miembro activo con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Miembro Puerta' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.checkinVenueId, status: 'ACTIVE' },
  })
  this.checkinMemberUserId = user.id
  this.checkinMemberMembershipId = membership.id
})

Given('un operador de puerta con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Operador Puerta' } })
  await db.userRole.create({
    data: { userId: user.id, role: 'DOOR_OPERATOR', venueId: this.checkinVenueId },
  })
  this.checkinDoorOpSessionToken = await createSession(user.id)
})

Given('el miembro tiene acceso al evento', async function (this: DionysusWorld) {
  await db.eventAccess.create({
    data: { membershipId: this.checkinMemberMembershipId, eventId: this.checkinEventId },
  })
})

Given('un usuario sin rol en ese venue con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Sin Rol' } })
  this.checkinNoRoleSessionToken = await createSession(user.id)
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('el operador verifica el acceso del miembro al evento', async function (this: DionysusWorld) {
  const GET = await getCheckinRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/checkin?userId=${this.checkinMemberUserId}&eventId=${this.checkinEventId}`,
      { headers: { Cookie: `session=${this.checkinDoorOpSessionToken}` } }
    )
  )
})

When('el operador verifica el userId {string} en el evento', async function (this: DionysusWorld, userId: string) {
  const GET = await getCheckinRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/checkin?userId=${userId}&eventId=${this.checkinEventId}`,
      { headers: { Cookie: `session=${this.checkinDoorOpSessionToken}` } }
    )
  )
})

When('ese usuario verifica el acceso del miembro al evento', async function (this: DionysusWorld) {
  const GET = await getCheckinRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/checkin?userId=${this.checkinMemberUserId}&eventId=${this.checkinEventId}`,
      { headers: { Cookie: `session=${this.checkinNoRoleSessionToken}` } }
    )
  )
})

When('se verifica acceso sin sesión', async function (this: DionysusWorld) {
  const GET = await getCheckinRoute()
  this.response = await GET(
    new Request(
      `http://localhost/api/checkin?userId=any&eventId=any`
    )
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('la respuesta indica que tiene acceso', async function (this: DionysusWorld) {
  const data = await this.response!.clone().json()
  assert.strictEqual(data.hasAccess, true, `Expected hasAccess=true, got: ${JSON.stringify(data)}`)
})

Then('la respuesta indica que no tiene acceso', async function (this: DionysusWorld) {
  const data = await this.response!.clone().json()
  assert.strictEqual(data.hasAccess, false, `Expected hasAccess=false, got: ${JSON.stringify(data)}`)
})

Then('la respuesta incluye el nombre del miembro', async function (this: DionysusWorld) {
  const data = await this.response!.clone().json()
  assert.ok(data.member?.name, `Expected member.name in response, got: ${JSON.stringify(data)}`)
})
