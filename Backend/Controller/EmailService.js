import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (req, res) => {
  // console.log(req.body);
  const { email, subject, name,pname,pdate,pquantity,pprice, response, que, caseType } = req.body;

  // Map caseType to template filenames
  const templateMap = {
    1: "Signup.hbs",
    2: "Ticket.hbs",
    3: "Orders.hbs"
  };

  if (!templateMap[caseType]) {
    res.status(400).json({ error: "Invalid caseType provided" });
    return;
  }

  // Resolve the file path for the chosen template
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, "../views", templateMap[caseType]);

  let htmlContent;
  try {
    // Read the template file
    const templateSource = fs.readFileSync(templatePath, "utf-8");

    // Compile the Handlebars template
    const template = Handlebars.compile(templateSource);

    if (caseType === 1) {
      htmlContent = template({ name, response });
    } else if (caseType === 2) {
      htmlContent = template({ name, que, response });
    }else if(caseType===3){
      const dateOnly = pdate.split("T")[0];
      htmlContent=template({name,pname,pprice,pdate:dateOnly,pquantity});
    }
  } catch (error) {
    console.error("Error reading or compiling template file:", error);
    res.status(500).json({ error: "Template file not found or invalid" });
    return;
  }

  // Mail options
  const mailOptions = {
    from: `AgriHaven <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html: htmlContent,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // console.log(mailOptions, "Email sent successfully.");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
