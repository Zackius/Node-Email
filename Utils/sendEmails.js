const nodemailer = require("nodemailer");

const myEmail = process.env.USER_GMAIL;
const myPass = process.env.USER_PASSWORD;
const myHost = process.env.EMAIL_HOST

const sendMail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: myHost,
    port: "465",
    auth: {
      user: myEmail,
      pass: myPass,
    },
  });

  const emailOptions = {
    from: sent_from ,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(emailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;