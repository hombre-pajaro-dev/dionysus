import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/modules/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    const session = await verifySession(token).catch(() => null);
    if (session) redirect("/dashboard");
  }

  redirect("/login");
}
