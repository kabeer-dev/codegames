const nodeMailer = require('nodemailer');

const sendMail = async (email) => {
    try {
        const transport = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // requireTLS: false,
            auth: {
                user: "hbdeveloper0@gmail.com",
                pass: 'sayt yqim ihle sfzi'
            },
            //   tls: {
            //     rejectUnauthorized: false // Add this if you encounter certificate issues
            //   }
        })
        const mailOptions = {
            from: 'hbdeveloper0@gmail.com',
            to: email,
            subject: 'Hello from Codegames.gg',
            text: 'This is a test email sent from Codegames.gg.',
            html: '<p>This is a test email sent from <b>Codegames.gg</b>. to inform that your order is Completed</p>'
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail send Successfully", info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendMail;