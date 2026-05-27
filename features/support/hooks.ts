// Must run before any module that reads env vars (Prisma, etc.)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

import { AfterAll, Before, After } from '@cucumber/cucumber'
import { db } from '@/lib/db'

const TEST_PHONE_PREFIX = '+525500'

Before(async function () {
  await db.otpCode.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
  await db.membership.deleteMany({ where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } })
  await db.userRole.deleteMany({ where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } })
  await db.user.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
})

After(async function () {
  await db.otpCode.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
  await db.membership.deleteMany({ where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } })
  await db.userRole.deleteMany({ where: { user: { phone: { startsWith: TEST_PHONE_PREFIX } } } })
  await db.user.deleteMany({ where: { phone: { startsWith: TEST_PHONE_PREFIX } } })
})

AfterAll(async function () {
  await db.$disconnect()
})
