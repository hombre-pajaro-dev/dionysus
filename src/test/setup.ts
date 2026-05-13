import { db } from "@/lib/db";
import { afterAll } from "vitest";

afterAll(async () => {
  await db.$disconnect();
});
