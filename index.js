import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const PORT = process.env.PORT || 5500;

const  myemail = process.env.USER_GMAIL
const mypass = process.env.USER_PASSWORD

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/post", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myemail,
    pass: mypass,
  },
});
const mailOptions = {
  from: req.body.email,
  to: "vincvneture@gmail.com",
  text: `From: ${req.body.emaill}\n\n${req.body.message}`,
};

app.listen(PORT, (res, req) => {
  if (error) {
    console.log("Servr failed");
  } else {
    console.log(`Listening at port ${PORT}`);
  }
});
