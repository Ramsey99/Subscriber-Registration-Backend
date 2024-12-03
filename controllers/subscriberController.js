const Subscriber = require("../models/Subscriber");
const Mail = require("../models/mailModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Illuminateacademy24@gmail.com",
    pass: "xqjk zuen bpdn kiul", // Add your email app password here
  },
});

// Create a new subscriber and send verification email
exports.createSubscriber = async (req, res) => {
  try {
    const subscriberData = req.body;
    const subscriber = new Subscriber(subscriberData);
    await subscriber.save();

    const email = subscriberData.applicantEmail;

    // Check if email is already verified
    const existingMail = await Mail.findOne({ email });
    if (existingMail && existingMail.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    const mail = new Mail({
      name: subscriberData.applicantName,
      email: email,
      isVerified: false,
    });

    await mail.save();

    // Send verification email without token
    const verificationLink = `http://localhost:5173/verify-email?email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Use the email from environment variables
      to: email,
      subject: "Email Verification",
      html: `<p>Thank you for registering! Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });

    res.status(201).json({
      message: "Subscriber created successfully. Verification email sent.",
      subscriber,
    });
  } catch (error) {
    console.error("Error creating subscriber or sending email:", error);
    res.status(500).json({ message: "Failed to create subscriber or send email" });
  }
};

// Email verification endpoint (without token)
exports.verifyEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }

  try {
    const existingMail = await Mail.findOne({ email });

    if (!existingMail) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    // Check if the email is already verified
    if (existingMail.isVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    // Mark the email as verified
    existingMail.isVerified = true;
    await existingMail.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Error verifying email." });
  }
};
