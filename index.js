const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./Utils/sendEmails");
const app = express();
const sendTo = process.env.SEND_TO;
const myEmail = process.env.USER_GMAIL

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

//POST
app.post("/api/sendemail", async (req, res) => {
  const { username, checked, phonenumber, delivery, note } = req.body;

  try {
    const send_to = sendTo;
    const sent_from = myEmail;
    const reply_to = sendTo;
    const subject = "New Order";
    const message = `
    <html lang="en" >
<head>
<meta charset="UTF-8">
<title> New Order </title>
</head>
<body>
<table style=" font-family: arial, sans-serif;  border-collapse: collapse; width: 100%;">
<tr>
  <th  style="font-size:1.4em;color: #f70d05;text-decoration:none;font-weight:700">Order Details </th>
  <th  style="font-size:1.4em;color: #f70d05;text-decoration:none;font-weight:700">Customer Info </th>
</tr>
<tr>
  <td style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:300; border: 1px solid #dddddd;">Customer Name</td>
  <td  style="font-size:1.4em;color: #0d0e0f;text-decoration:none;font-weight:700; border: 1px solid #dddddd;">${username}</td>
</tr>
<tr>
  <td style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:300;border: 1px solid #dddddd;">Phone Number</td>
  <td  style="font-size:1.4em;color: #0d0e0f;text-decoration:none;font-weight:700;   border: 1px solid #dddddd;">${phonenumber}</td>
</tr>
<tr>
  <td style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:300;border: 1px solid #dddddd;">Delivery Location</td>
  <td  style="font-size:1.4em;color: #0d0e0f;text-decoration:none;font-weight:700; border: 1px solid #dddddd;">${delivery}</td>
</tr>
<tr>
  <td style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:300;border: 1px solid #dddddd;">Item Bought</td>
  <td  style="font-size:1.4em;color: #0d0e0f;text-decoration:none;font-weight:700;  border: 1px solid #dddddd;">${checked}</td>
</tr>
<tr>
  <td style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:300;border: 1px solid #dddddd;">Optional Note</td>
  <td  style="font-size:1.4em;color: #0d0e0f;text-decoration:none;font-weight:700;  border: 1px solid #dddddd;">${note}</td>
</tr>
</table>
</body>
</html>`;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
