import QRCode from "qrcode";

// The QR encodes the member's ID only — balance is always queried live via API
export async function generateQrDataUrl(memberId: string): Promise<string> {
  return QRCode.toDataURL(memberId, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 300,
    color: { dark: "#000000", light: "#ffffff" },
  });
}

export async function generateQrSvg(memberId: string): Promise<string> {
  return QRCode.toString(memberId, { type: "svg", errorCorrectionLevel: "H" });
}

// Apple Wallet and Google Wallet integration — stubs for Phase 1
// Requires Apple Developer certificates (passkit-generator) and Google Wallet API credentials
export async function generateAppleWalletPass(_memberId: string): Promise<Buffer> {
  throw new Error("Apple Wallet integration not yet configured — requires Apple Developer certificates");
}

export async function generateGoogleWalletPassUrl(_memberId: string): Promise<string> {
  throw new Error("Google Wallet integration not yet configured — requires Google Wallet API credentials");
}
