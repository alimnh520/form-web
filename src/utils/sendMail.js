import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, otp }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_MAIL,
                pass: process.env.APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.APP_MAIL,
            to: email,
            subject: 'verify your account',
            from: process.env.APP_MAIL,
            to: email,
            subject: 'Verify your email address',
            html: `
                <div>
                    <p>Paste the code to verify your account</p>
                    <p>Your verify code is ${otp}</p>
                </div>
            `
        }
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log(error);
    }
}