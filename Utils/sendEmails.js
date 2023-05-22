const nodemailer = require("nodemailer");

const myEmail = process.env.USER_GMAIL;
const myPass = process.env.USER_PASSWORD;
const myHost = process.env.EMAIL_HOST;
const sendTo = process.env.SEND_TO;
const emailPost = process.env.EMAIL_POST;

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: emailPost,
    port: "465",
    secure: true,
    logger: true,
    debug: true,
    secureConnection: true,
    auth: {
      user: sendTo,
      pass: myPass,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
