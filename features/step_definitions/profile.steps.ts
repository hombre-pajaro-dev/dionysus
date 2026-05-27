// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { DionysusWorld } from '../support/world'

async function getProfileRoute() {
  const mod = await import('@/app/api/profile/route')
  return { GET: mod.GET, PATCH: mod.PATCH }
}

// ─── Whens ───────────────────────────────────────────────────────────────────

When('consulta su perfil', async function (this: DionysusWorld) {
  const { GET } = await getProfileRoute()
  const headers: Record<string, string> = {}
  if (this.sessionToken) headers['Cookie'] = `session=${this.sessionToken}`
  this.response = await GET(
    new Request('http://localhost/api/profile', { headers })
  )
})

When('actualiza su perfil con nombre {string} y ciudad {string}', async function (
  this: DionysusWorld,
  name: string,
  city: string
) {
  const { PATCH } = await getProfileRoute()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (this.sessionToken) headers['Cookie'] = `session=${this.sessionToken}`
  this.response = await PATCH(
    new Request('http://localhost/api/profile', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ name, city }),
    })
  )
})

When('actualiza su arte a {string}', async function (this: DionysusWorld, artPractice: string) {
  const { PATCH } = await getProfileRoute()
  this.response = await PATCH(
    new Request('http://localhost/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
      body: JSON.stringify({ artPractice }),
    })
  )
})

When('actualiza su perfil con nombre vacío', async function (this: DionysusWorld) {
  const { PATCH } = await getProfileRoute()
  this.response = await PATCH(
    new Request('http://localhost/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `session=${this.sessionToken}`,
      },
      body: JSON.stringify({ name: '' }),
    })
  )
})

// ─── Thens ───────────────────────────────────────────────────────────────────

Then('la respuesta incluye su teléfono {string}', async function (this: DionysusWorld, phone: string) {
  const data = await this.response!.clone().json()
  assert.equal(data.phone, phone, `Expected phone="${phone}", got: ${data.phone}`)
})

Then('la respuesta contiene nombre {string}', async function (this: DionysusWorld, name: string) {
  const data = await this.response!.clone().json()
  assert.equal(data.name, name, `Expected name="${name}", got: ${data.name}`)
})

Then('la respuesta contiene ciudad {string}', async function (this: DionysusWorld, city: string) {
  const data = await this.response!.clone().json()
  assert.equal(data.city, city, `Expected city="${city}", got: ${data.city}`)
})

Then('la respuesta contiene artPractice {string}', async function (this: DionysusWorld, artPractice: string) {
  const data = await this.response!.clone().json()
  assert.equal(data.artPractice, artPractice, `Expected artPractice="${artPractice}", got: ${data.artPractice}`)
})
