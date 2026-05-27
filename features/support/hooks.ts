// Must run before any module that reads env vars (Prisma, etc.)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { AfterAll, Before, After } from '@cucumber/cucumber'
import { db } from '@/lib/db'

const TEST_PHONE_PREFIX = '+525500'
const TEST_VENUE_SLUG_PREFIX = 'test-'

async function cleanTestData() {
  // Delete in FK-safe order
  await db.inviteLinkUse.deleteMany({
    where: { membership: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } },
  })
  await db.transaction.deleteMany({
    where: { membership: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } },
  })
  await db.eventAccess.deleteMany({
    where: { membership: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } },
  })
  await db.payment.deleteMany({
    where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } },
  })
  await db.membership.deleteMany({
    where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } },
  })
  await db.inviteLink.deleteMany({
    where: { venue: { slug: { startsWith: TEST_VENUE_SLUG_PREFIX } } },
  })
  await db.userRole.deleteMany({
    where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } },
  })
  await db.event.deleteMany({
    where: { venue: { slug: { startsWith: TEST_VENUE_SLUG_PREFIX } } },
  })
  await db.otpCode.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
  await db.user.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
  await db.venue.deleteMany({ where: { slug: { startsWith: TEST_VENUE_SLUG_PREFIX } } })
}

Before(async function () {
  await cleanTestData()
})

After(async function () {
  await cleanTestData()
})

AfterAll(async function () {
  await db.$disconnect()
})
