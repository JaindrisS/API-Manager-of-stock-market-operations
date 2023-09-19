import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const createTransport = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "834df39b17b371",
      pass: "e36416d59ec0a7",
    },
  });

  return transport;
};
export const sendEmail = async (email: string, Message: string, html: any) => {
  const transporter = createTransport();
  let info = await transporter.sendMail({
    from: "jaindrissosajsd@gmail.com",
    to: email,
    subject: Message,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
};
