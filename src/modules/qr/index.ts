import QRCode from "qrcode";

// QR encodes the user's global ID — balance is queried live via API using userId + venue API key
export async function generateQrDataUrl(userId: string): Promise<string> {
  return QRCode.toDataURL(userId, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 300,
    color: { dark: "#000000", light: "#ffffff" },
  });
}

export async function generateQrSvg(userId: string): Promise<string> {
  return QRCode.toString(userId, { type: "svg", errorCorrectionLevel: "H" });
}

// Apple Wallet and Google Wallet integration — stubs for Phase 1
// Requires Apple Developer certificates (passkit-generator) and Google Wallet API credentials
export async function generateAppleWalletPass(_userId: string): Promise<Buffer> {
  throw new Error("Apple Wallet integration not yet configured — requires Apple Developer certificates");
}

export async function generateGoogleWalletPassUrl(_userId: string): Promise<string> {
  throw new Error("Google Wallet integration not yet configured — requires Google Wallet API credentials");
}
