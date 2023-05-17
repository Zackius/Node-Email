import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vincvneture@gmail.com",
      pass: "vinc2023ventures",
    },
  });