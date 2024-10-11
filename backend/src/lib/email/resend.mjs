import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, html, subject) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [to],
    subject,
    html,
  });

  if (error) {
    return console.error({ error });
  }
}

export default sendEmail;
