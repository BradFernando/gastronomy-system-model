import nodemailer from "nodemailer";

// Crear un transportador de correo utilizando SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Tu dirección de correo electrónico de Gmail
    pass: process.env.SMTP_PASSWORD, // La contraseña de tu cuenta de Gmail
  },
});

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    const options = {
        from: '"Gastronomy Systems" <conference1ciences@gmail.com>', // Tu dirección de correo electrónico de Gmail
        to: email,
        subject: "Código de verificación de dos pasos",
        html: `<p>Tu código de verificación de dos pasos es: ${token}</p>`
    };

    await transporter.sendMail(options);
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `https://gastronomy-system-model-si1k.vercel.app/auth/new-password?token=${token}`;

    const options = {
      from: '"Gastronomy Systems" <conference1ciences@gmail.com>', // Tu dirección de correo electrónico de Gmail
      to: email,
      subject: "Restablece tu contraseña",
      html: `<p>Clickea <a href="${resetLink}">Aqui</a> para restablecer tu contraseña </p>`
    };

    await transporter.sendMail(options);
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `https://gastronomy-system-model-si1k.vercel.app/auth/new-verification?token=${token}`;

    const options = {
        from: '"Gastronomy Systems" <conference1ciences@gmail.com>', // Tu dirección de correo electrónico de Gmail
        to: email,
        subject: "Porfavor confirma tu correo",       html: `<p>Clickea <a href="${confirmLink}">Aqui</a> para confirmar tu email </p>`
    };

    await transporter.sendMail(options);
};