import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { AUTH_RESEND_KEY } from "./env.ts";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "My App <onboarding@resend.dev>",
      to: [email],
      subject: "Sign in to My App",
      text: "Your code is " + token,
    });

    if (error) {
      throw new Error("Could not send");
    }
  },
});
