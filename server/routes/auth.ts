import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

function decodeFirebaseToken(idToken: string): { uid?: string; email?: string } {
  try {
    const [, payload] = idToken.split(".");
    const json = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const data = JSON.parse(json);
    return { uid: data.user_id || data.sub, email: data.email };
  } catch {
    return {};
  }
}

export const exchangeFirebaseToken: RequestHandler = (req, res) => {
  const { idToken } = req.body as { idToken?: string };
  if (!idToken) {
    return res.status(400).json({ error: "idToken is required" });
  }

  const { uid, email } = decodeFirebaseToken(idToken);
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";

  // Issue a short-lived JWT for the app session
  const token = jwt.sign(
    {
      sub: uid || "anonymous",
      email,
      provider: "firebase",
      scope: ["user"],
    },
    secret,
    { expiresIn: "1h" },
  );

  res.json({ token });
};
