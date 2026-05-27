// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'
import { db } from '@/lib/db'
import { createSession } from '@/modules/auth'

async function getQrRoute() {
  const mod = await import('@/app/api/qr/route')
  return mod.GET
}
async function getQrSvgRoute() {
  const mod = await import('@/app/api/qr/svg/route')
  return mod.GET
}

Given('el usuario tiene una sesión activa', async function (this: DionysusWorld) {
  const user = await db.user.upsert({
    where: { phone: this.phone },
    update: {},
    create: { phone: this.phone, name: 'QR Test User' },
  })
  this.userId = user.id
  this.sessionToken = await createSession(user.id)
})

Given('no hay sesión activa', function (this: DionysusWorld) {
  this.sessionToken = ''
  this.userId = ''
})

When('solicita su QR como PNG', async function (this: DionysusWorld) {
  const GET = await getQrRoute()
  const headers: Record<string, string> = {}
  if (this.sessionToken) headers['Cookie'] = `session=${this.sessionToken}`
  this.response = await GET(
    new Request('http://localhost/api/qr', { headers })
  )
})

When('solicita su QR como SVG', async function (this: DionysusWorld) {
  const GET = await getQrSvgRoute()
  const headers: Record<string, string> = {}
  if (this.sessionToken) headers['Cookie'] = `session=${this.sessionToken}`
  this.response = await GET(
    new Request('http://localhost/api/qr/svg', { headers })
  )
})

Then('la respuesta contiene un campo {string} con prefijo {string}', async function (
  this: DionysusWorld,
  field: string,
  prefix: string
) {
  const data = await this.response!.clone().json()
  assert.ok(
    typeof data[field] === 'string' && data[field].startsWith(prefix),
    `Expected "${field}" to start with "${prefix}", got: ${data[field]?.slice(0, 40)}`
  )
})

Then('el Content-Type es {string}', function (this: DionysusWorld, expected: string) {
  const ct = this.response!.headers.get('content-type') ?? ''
  assert.ok(ct.includes(expected), `Expected Content-Type to include "${expected}", got: "${ct}"`)
})

Then('el cuerpo contiene {string}', async function (this: DionysusWorld, snippet: string) {
  const text = await this.response!.clone().text()
  assert.ok(text.includes(snippet), `Expected body to contain "${snippet}"`)
})

Then('la respuesta contiene un campo {string} igual al userId del miembro', async function (
  this: DionysusWorld,
  field: string
) {
  const data = await this.response!.clone().json()
  assert.equal(data[field], this.userId)
})
