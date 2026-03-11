import formidable from "formidable";
import fs from "fs";
import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first"); // ✅ fix smtp

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ msg: "File error" });

    const email = fields.email;
    const file = files.file;

    const data = fs.readFileSync(file[0].filepath, "utf8");

    // simple summary (for demo fast)
    const summary = `Sales CSV uploaded successfully.\nRows:\n${data
      .split("\n")
      .slice(0, 5)
      .join("\n")}`;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: " Sales Summary",
        text: summary,
      });

      res.json({ msg: " Summary sent successfully!" });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  });
}