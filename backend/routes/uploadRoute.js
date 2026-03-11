const express = require("express");
const multer = require("multer");
const parseFile = require("../utils/parseFile");
const generateSummary = require("../services/aiService");
const sendEmail = require("../services/emailService");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const email = req.body.email;

    if (!req.file) return res.status(400).json({ msg: "File required" });

    const data = await parseFile(req.file);

    const summary = await generateSummary(data);

    await sendEmail(email, summary);

    res.json({ msg: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;