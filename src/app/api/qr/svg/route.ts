import { getSessionFromRequest } from "@/lib/auth-request";
import { generateQrSvg } from "@/modules/qr";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const svg = await generateQrSvg(session.userId);
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
