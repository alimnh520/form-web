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
            subject: 'ভেরিফিকেশন কোড (OTP) - রাজিম ল্যান্ড সার্ভিস',
            html: `
                <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background: #4CAF50; color: #fff; padding: 15px; text-align: center; font-size: 20px; font-weight: bold;">
            রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট অনলাইন
          </div>
          <div style="padding: 20px; color: #333; line-height: 1.6;">
            <p>প্রিয় উদ্যোক্তা,</p>
            <p>রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট অনলাইন-এ রেজিস্ট্রেশনের জন্য ধন্যবাদ।</p>
            <p style="margin: 20px 0; font-size: 16px;">আপনার ভেরিফিকেশন কোড (OTP):</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 28px; font-weight: bold; color: #4CAF50; letter-spacing: 3px; padding: 10px 20px; border: 2px dashed #4CAF50; border-radius: 8px; display: inline-block;">
                ${otp}
              </span>
            </div>
            <p>👉 অনুগ্রহ করে এই কোড ব্যবহার করে রেজিস্ট্রেশন সম্পূর্ণ করুন।</p>
            <p>আমাদের সাথে যুক্ত হয়ে আপনি ডিজিটাল ভূমি সেবার একজন গর্বিত উদ্যোক্তা হতে যাচ্ছেন।</p>
          </div>
          <div style="background: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #555;">
            — রাজিম ল্যান্ড সার্ভিস এন্ড কনসালটেন্ট অনলাইন
          </div>
        </div>
      </div>`,
        };
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log(error);
    }
}
