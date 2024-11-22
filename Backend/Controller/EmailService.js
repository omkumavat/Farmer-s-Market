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
  console.log(req.body);
  const { email, subject, name, caseType } = req.body;

  // Map caseType to template filenames
  const templateMap = {
    1: "Signup.hbs",
    2: "productListing.hbs",
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

    // Pass dynamic data to the template
    htmlContent = template({ name }); // Inject the 'name' variable
  } catch (error) {
    console.error("Error reading or compiling template file:", error);
    res.status(500).json({ error: "Template file not found or invalid" });
    return;
  }

  // Mail options
  const mailOptions = {
    from: `From VERDICA <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html: htmlContent,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(mailOptions, "Email sent successfully.");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
