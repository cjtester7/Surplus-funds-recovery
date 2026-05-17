import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Email Notification
  app.post("/api/notify", async (req, res) => {
    const { address, state, auctionDate, phone, email } = req.body;

    // Check if we have credentials
    if (!process.env.EMAIL_SERVICE_USER || !process.env.EMAIL_SERVICE_PASS) {
      console.warn("Email credentials not configured. Skipping email alert.");
      return res.status(200).json({ success: false, message: "Email not configured" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SERVICE_USER,
          pass: process.env.EMAIL_SERVICE_PASS,
        },
      });

      const mailOptions = {
        from: `"Surplus Recovery Alerts" <${process.env.EMAIL_SERVICE_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_SERVICE_USER,
        subject: "New Lead: Surplus Funds Recovery Inquiry",
        html: `
          <h3>New Eligibility Request Received</h3>
          <p><strong>Property Address:</strong> ${address}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Auction Date:</strong> ${auctionDate}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <hr />
          <p><em>Check the Firebase Console for more details.</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Notification email sent successfully");
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
