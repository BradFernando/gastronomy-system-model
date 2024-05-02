import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Restablece tu contraseña",
      html: `<p>Clickea <a href="${resetLink}">Aqui</a> para restablecer tu contraseña </p>`
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Porfavor confirma tu correo",
        html: `<p>Clickea <a href="${confirmLink}">Aqui</a> para confirmar tu email </p>`
    });
};