import twilio from "twilio";

function getTwilio() {
  return {
    client: twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!),
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM!}`,
  };
}

function toWhatsApp(phone: string) {
  return `whatsapp:${phone}`;
}

export async function sendOtp(phone: string, code: string) {
  const { client, from } = getTwilio();
  await client.messages.create({
    from,
    to: toWhatsApp(phone),
    body: `Tu código de acceso a Dionysus es: *${code}*\nVálido por 10 minutos.`,
  });
}

export async function sendWelcome(phone: string, name: string) {
  const { client, from } = getTwilio();
  await client.messages.create({
    from,
    to: toWhatsApp(phone),
    body: `¡Bienvenido/a ${name}! Tu solicitud fue aprobada 🎉\nEntra a la plataforma para ver tu perfil y tu QR.`,
  });
}

export async function sendPendingApprovalAlert(
  organizerPhone: string,
  applicant: { name: string; artPractice?: string | null; whyJoin?: string | null }
) {
  const { client, from } = getTwilio();
  await client.messages.create({
    from,
    to: toWhatsApp(organizerPhone),
    body: [
      `Nueva solicitud de membresía:`,
      `👤 ${applicant.name}`,
      applicant.artPractice ? `🎨 ${applicant.artPractice}` : null,
      applicant.whyJoin ? `💬 "${applicant.whyJoin}"` : null,
      `\nEntra a la plataforma para aprobar o rechazar.`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
