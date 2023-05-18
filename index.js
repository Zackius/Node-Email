const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const myemail = process.env.USER_GMAIL;
const mypass = process.env.USER_PASSWORD;


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
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
    const transporter = nodemailer.createTransport({
     service: "gmail",
      auth: {
        user: myemail,
        pass: mypass,
      },
    });
    const mail_configs = {
      from: "myemail",
      to: "ndunguzachary24@gmail.com",
      subject: "New Order",
      text: values
//       html: `< !DOCTYPE html>
//       <html lang="en" >
// <head>
//   <meta charset="UTF-8">
//   <title>CodePen - OTP Email Template</title>
// </head>
// <body>
// <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
// <div style="margin:50px auto;width:70%;padding:20px 0">
//   <div style="border-bottom:1px solid #eee">
//     <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">New Order</a>
//   </div>
//   <p>Customer Name : ${values}</p>

//   <hr style="border:none;border-top:1px solid #eee" />
//   <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//   </div>
// </div>
// </div> 
// </body>
// </html>`,
    };

app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/send_email", function (req, res){
  sendEmail(req.body)
    .then((response) => res.send(response.message))

    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log("Server up and running");
});
