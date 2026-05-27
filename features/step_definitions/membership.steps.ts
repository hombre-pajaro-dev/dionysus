// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { createSession } from '@/modules/auth'
import { generateInviteLink } from '@/modules/membership'

async function getInviteRoute(token: string) {
  const mod = await import('@/app/api/invite/[token]/route')
  return mod.POST
}
async function getMembershipInviteRoute() {
  const mod = await import('@/app/api/membership/invite/route')
  return mod.POST
}
async function getMembershipPendingRoute() {
  const mod = await import('@/app/api/membership/pending/route')
  return mod.GET
}
async function getMembershipApproveRoute() {
  const mod = await import('@/app/api/membership/[id]/approve/route')
  return mod.POST
}
async function getMembershipSuspendRoute() {
  const mod = await import('@/app/api/membership/[id]/suspend/route')
  return mod.POST
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un venue privado de prueba', async function (this: DionysusWorld) {
  const venue = await db.venue.create({
    data: {
      name: 'Test Venue',
      slug: 'test-venue-bdd',
      visibility: 'PRIVATE',
      manifesto: 'Manifiesto de prueba',
    },
  })
  this.venueId = venue.id
})

Given('un organizador con teléfono {string} en ese venue', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Organizador Test' } })
  await db.userRole.create({ data: { userId: user.id, role: 'ORGANIZER', venueId: this.venueId } })
  this.organizerUserId = user.id
  this.sessionToken = await createSession(user.id)
})

Given('una liga de invitación válida generada por el organizador', async function (this: DionysusWorld) {
  this.inviteToken = await generateInviteLink(this.organizerUserId, this.venueId, 1)
})

Given('un usuario existente con teléfono {string}', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
  await db.user.create({ data: { phone, name: 'Usuario Existente' } })
})

Given('una liga de invitación ya agotada', async function (this: DionysusWorld) {
  // Create invite with maxUses=1
  const token = await generateInviteLink(this.organizerUserId, this.venueId, 1)
  const invite = await db.inviteLink.findUnique({ where: { token } })
  // Create a user + membership to consume the invite
  const user = await db.user.create({ data: { phone: '+525500009901', name: 'Prev User' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.venueId, status: 'PENDING' },
  })
  await db.inviteLinkUse.create({ data: { inviteLinkId: invite!.id, membershipId: membership.id } })
  this.inviteToken = token
})

Given('una solicitud pendiente de {string} en el venue', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Solicitante' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.venueId, status: 'PENDING' },
  })
  this.membershipId = membership.id
})

Given('una membresía activa de {string} en el venue', async function (this: DionysusWorld, phone: string) {
  const user = await db.user.create({ data: { phone, name: 'Miembro Activo' } })
  const membership = await db.membership.create({
    data: { userId: user.id, venueId: this.venueId, status: 'ACTIVE' },
  })
  this.membershipId = membership.id
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('el organizador genera una liga de invitación para el venue', async function (this: DionysusWorld) {
  const POST = await getMembershipInviteRoute()
  this.response = await POST(
    new Request('http://localhost/api/membership/invite', {
      method: 'POST',
      body: JSON.stringify({ venueId: this.venueId }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
    })
  )
})

When('una persona con teléfono {string} se registra via esa liga', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
  const POST = await getInviteRoute(this.inviteToken)
  this.response = await POST(
    new Request(`http://localhost/api/invite/${this.inviteToken}`, {
      method: 'POST',
      body: JSON.stringify({ phone, name: 'Nuevo Usuario', howHeard: 'Un amigo', whyJoin: 'Me interesa' }),
      headers: { 'Content-Type': 'application/json' },
    }),
    { params: Promise.resolve({ token: this.inviteToken }) }
  )
})

When('ese usuario se registra via esa liga', async function (this: DionysusWorld) {
  const POST = await getInviteRoute(this.inviteToken)
  this.response = await POST(
    new Request(`http://localhost/api/invite/${this.inviteToken}`, {
      method: 'POST',
      body: JSON.stringify({ phone: this.phone, name: 'Usuario Existente', howHeard: 'Web', whyJoin: 'Quiero participar' }),
      headers: { 'Content-Type': 'application/json' },
    }),
    { params: Promise.resolve({ token: this.inviteToken }) }
  )
})

When('una persona con teléfono {string} intenta registrarse via esa liga', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
  const POST = await getInviteRoute(this.inviteToken)
  this.response = await POST(
    new Request(`http://localhost/api/invite/${this.inviteToken}`, {
      method: 'POST',
      body: JSON.stringify({ phone, name: 'Persona', howHeard: 'Web', whyJoin: 'Quiero' }),
      headers: { 'Content-Type': 'application/json' },
    }),
    { params: Promise.resolve({ token: this.inviteToken }) }
  )
})

When('una persona con teléfono {string} intenta registrarse via liga {string}', async function (this: DionysusWorld, phone: string, token: string) {
  this.phone = phone
  const POST = await getInviteRoute(token)
  this.response = await POST(
    new Request(`http://localhost/api/invite/${token}`, {
      method: 'POST',
      body: JSON.stringify({ phone, name: 'Persona', howHeard: 'Web', whyJoin: 'Quiero' }),
      headers: { 'Content-Type': 'application/json' },
    }),
    { params: Promise.resolve({ token }) }
  )
})

When('el organizador consulta las solicitudes pendientes del venue', async function (this: DionysusWorld) {
  const GET = await getMembershipPendingRoute()
  this.response = await GET(
    new Request(`http://localhost/api/membership/pending?venueId=${this.venueId}`, {
      headers: { Cookie: `session=${this.sessionToken}` },
    })
  )
})

When('el organizador aprueba esa membresía', async function (this: DionysusWorld) {
  const POST = await getMembershipApproveRoute()
  this.response = await POST(
    new Request(`http://localhost/api/membership/${this.membershipId}/approve`, {
      method: 'POST',
      headers: { Cookie: `session=${this.sessionToken}` },
    }),
    { params: Promise.resolve({ id: this.membershipId }) }
  )
})

When('el organizador suspende esa membresía', async function (this: DionysusWorld) {
  const POST = await getMembershipSuspendRoute()
  this.response = await POST(
    new Request(`http://localhost/api/membership/${this.membershipId}/suspend`, {
      method: 'POST',
      headers: { Cookie: `session=${this.sessionToken}` },
    }),
    { params: Promise.resolve({ id: this.membershipId }) }
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('la respuesta contiene un token de invitación', async function (this: DionysusWorld) {
  const body = await this.response!.json()
  assert.ok(body.token, 'Token de invitación ausente en respuesta')
  this.inviteToken = body.token
})

Then('la membresía queda en estado {string}', async function (this: DionysusWorld, expectedStatus: string) {
  const membership = this.membershipId
    ? await db.membership.findUnique({ where: { id: this.membershipId } })
    : await db.membership.findFirst({ where: { user: { phone: this.phone } } })
  assert.ok(membership, 'Membresía no encontrada')
  assert.equal(membership.status, expectedStatus)
})

Then('el referente de la membresía es el organizador', async function (this: DionysusWorld) {
  const membership = await db.membership.findFirst({
    where: { user: { phone: this.phone } },
  })
  assert.equal(membership?.referrerId, this.organizerUserId)
})

Then('existe solo un usuario con teléfono {string} en la base de datos', async function (this: DionysusWorld, phone: string) {
  const count = await db.user.count({ where: { phone } })
  assert.equal(count, 1)
})

Then('la respuesta incluye la solicitud de {string}', async function (this: DionysusWorld, phone: string) {
  const body = await this.response!.json()
  const found = body.some((m: { user: { phone: string } }) => m.user.phone === phone)
  assert.ok(found, `Solicitud de ${phone} no encontrada en la respuesta`)
})

Then('la membresía con id almacenado queda en estado {string}', async function (this: DionysusWorld, expectedStatus: string) {
  const membership = await db.membership.findUnique({ where: { id: this.membershipId } })
  assert.equal(membership?.status, expectedStatus)
})
