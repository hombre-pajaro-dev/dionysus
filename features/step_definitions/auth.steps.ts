// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { generateOtp, createSession } from '@/modules/auth'

// Lazy-load route handlers to avoid Next.js bootstrap at import time
async function getSendRoute() {
  const mod = await import('@/app/api/auth/otp/send/route')
  return mod.POST
}
async function getVerifyRoute() {
  const mod = await import('@/app/api/auth/otp/verify/route')
  return mod.POST
}
async function getLogoutRoute() {
  const mod = await import('@/app/api/auth/logout/route')
  return mod.POST
}

// ─── Givens ──────────────────────────────────────────────────────────────────

Given('un teléfono de prueba {string}', async function (this: DionysusWorld, phone: string) {
  this.phone = phone
})

Given('un OTP ya generado para ese teléfono', async function (this: DionysusWorld) {
  this.otp = await generateOtp(this.phone)
})

Given('una sesión activa para ese teléfono', async function (this: DionysusWorld) {
  const user = await db.user.upsert({
    where: { phone: this.phone },
    update: {},
    create: { phone: this.phone, name: 'Test User' },
  })
  const token = await createSession(user.id)
  this.response = new Response(null, {
    headers: { 'Set-Cookie': `session=${token}; HttpOnly; Path=/` },
  })
  // Store token for logout step
  this.otp = token
})

// ─── Whens ───────────────────────────────────────────────────────────────────

When('solicita un OTP', async function (this: DionysusWorld) {
  const POST = await getSendRoute()
  this.response = await POST(
    new Request('http://localhost/api/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone: this.phone }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
})

When('solicita un OTP sin proporcionar teléfono', async function (this: DionysusWorld) {
  const POST = await getSendRoute()
  this.response = await POST(
    new Request('http://localhost/api/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })
  )
})

When('verifica el OTP con el código correcto', async function (this: DionysusWorld) {
  const POST = await getVerifyRoute()
  this.response = await POST(
    new Request('http://localhost/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone: this.phone, code: this.otp }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
})

When('verifica el OTP con código incorrecto {string}', async function (this: DionysusWorld, wrong: string) {
  const POST = await getVerifyRoute()
  this.response = await POST(
    new Request('http://localhost/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone: this.phone, code: wrong }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
})

When('cierra sesión', async function (this: DionysusWorld) {
  const POST = await getLogoutRoute()
  this.response = await POST(
    new Request('http://localhost/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: `session=${this.otp}` },
    })
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('recibe status {int}', function (this: DionysusWorld, expectedStatus: number) {
  assert.equal(this.response!.status, expectedStatus)
})

Then('existe un OTP activo en la base de datos para ese teléfono', async function (this: DionysusWorld) {
  const otp = await db.otpCode.findFirst({
    where: { phone: this.phone, usedAt: null, expiresAt: { gt: new Date() } },
  })
  assert.ok(otp, 'No OTP activo encontrado en DB')
})

Then('existe el usuario en la base de datos', async function (this: DionysusWorld) {
  const user = await db.user.findUnique({ where: { phone: this.phone } })
  assert.ok(user, 'Usuario no encontrado en DB')
})

Then('la respuesta contiene cookie de sesión', function (this: DionysusWorld) {
  const setCookie = this.response!.headers.get('set-cookie') ?? ''
  assert.ok(setCookie.includes('session='), 'Cookie de sesión ausente en respuesta')
})

Then('la cookie de sesión está eliminada', function (this: DionysusWorld) {
  const setCookie = this.response!.headers.get('set-cookie') ?? ''
  assert.ok(
    setCookie.includes('session=;') || setCookie.includes('Max-Age=0') || setCookie.includes('Expires='),
    'Cookie de sesión no fue eliminada'
  )
})
