const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendMail = require("./Utils/sendEmails")
const port = 5000;
const myemail = process.env.USER_GMAIL;
const mypass = process.env.USER_PASSWORD;
const sendTo = process.env.SEND_TO



//  middleware 
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// routes 
app.get("/", (req, res) => {
  res.send("Home page")
});
  
app.post("/sendMail", async (req, res) => {
  const { values } = req.body;
  try {
    const send_to = sendTo 
    const sent_from = myemail
    const subject = "New Order"
    const message = `< !DOCTYPE html>
          <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
    </head>
    <body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">New Order</a>
      </div>
      <p>Customer Name : ${values}</p>
    
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      </div>
    </div>
    </div> 
    </body>
    </html>`;
    await sendMail(subject, message, send_to, sent_from);
    res.status(200).json({success: true, message: "Email Sent"})
  } catch (error) {
    res.status(500).json(error.message)
  }
})

app.listen(port, () => {
  console.log("Server up and running");
});
