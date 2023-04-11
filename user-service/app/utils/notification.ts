const accountSid = "ACe4bd280313799f825de643f86316900b";
const authToken = "42c1188d93b29860076274460813b99f";
const client = require("twilio")(accountSid, authToken);

export function generateAccessToken() {
  const code = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  //set expiry date to next 10 min
  expiry.setTime(new Date().getTime() + 10 * 60 * 1000);
  return { code, expiry };
}

export async function sendVerificationToken(
  code: number,
  toPhoneNumber: string
) {
  const response = await client.messages.create({
    body: `Your saybuy verification code is: ${code}`,
    from: "+15076367538",
    to: toPhoneNumber.trim(),
  });
  return response;
}

async function verifyAccessToken() {}
