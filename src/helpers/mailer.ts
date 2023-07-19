import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userID}: any) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000} // 1 hour
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000} // 1 hour
            );
        }

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f5e6125c859885",
                pass: "3067d4810a5f1c"
            }
        });

        // send mail with defined transport object
        const mailOptions = {
            from: 'prithvirajmahamulkar100@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click on the link below to ${emailType === "VERIFY" ? "verify your email" : "reset you password"} </p>
            <a href="${process.env.domain}/verifyemail?token=${hashedToken}">${emailType === "VERIFY" ? "Verify your email" : "Reset you password"}</a>
            <p>or copy and paste the link in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}</p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}