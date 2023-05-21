const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./Utils/sendEmails");
const app = express();
const sendTo = process.env.SEND_TO;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const {username, checked, phonenumber, deliverylocation, optionalnote}=
    req.body;

  try {
    const send_to = sendTo;
    const sent_from = sendTo;
    const reply_to = sendTo;
    const subject = "New Order";
    const message = `
    <html lang="en" >
<head>
<meta charset="UTF-8">
<title> New Order</title>
</head>
<body>
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
<div style="border-bottom:1px solid #eee">
  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">New Order</a>
</div>
<p> <span  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Customer Name </span> : ${ username
    }</p>
<p> <span  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Phone Number: </span>${{
      phonenumber
    }}</p>
<p> <span  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Delivery Location: </span>${{
      deliverylocation
    }}</p>
<p><span  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Item bought:</span> ${{
      checked
    }}</p>
<p><span  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Optional Note:</span> ${{
      optionalnote
    }}</p>
<hr style="border:none;border-top:1px solid #eee" />
<div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
</div>
</div>
</div> 
</body>
</html>`;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
