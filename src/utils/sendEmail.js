import nodemailer from "nodemailer";
const sendEmail = async ({ from = process.env.EMAIL, to, subject, text, html, cc, bcc, attachments } = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {

            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls : {
            rejectUnauthorized : false 
              // must provide server name, otherwise TLS certificate check will fail
        // servername: "example.com"
        }
    });

    const info = await transporter.sendMail({
        from: `" E-commerce __Adel_Elbamby" <${from}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        cc,
        bcc,
        attachments
    });
    // console.log("Message sent: %s", info);
    return info.rejected.length ? false : true  // to send true when send email 
}

export default sendEmail