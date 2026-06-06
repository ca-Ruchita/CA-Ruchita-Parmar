import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, regarding, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = (process.env.SMTP_USER || '').trim();
    const pass = (process.env.SMTP_PASS || '').replace(/\s/g, '');
    const contactEmail = (process.env.CONTACT_EMAIL || user).trim();

    if (!user || !pass || !contactEmail) {
      return NextResponse.json({ error: 'Email service not configured. Please contact directly.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    // 1. Notify owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New enquiry from ${firstName} — ${regarding}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nRegarding: ${regarding}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#0d0d10;color:#f0f0f5;border-radius:16px;overflow:hidden;border:1px solid rgba(212,160,58,0.25);">
          <div style="background:linear-gradient(135deg,#1a1500,#0d0d10);padding:32px 32px 24px;border-bottom:1px solid rgba(212,160,58,0.2);">
            <p style="margin:0 0 6px;color:#d4a03a;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;">CA RUCHITA PARMAR · PORTFOLIO</p>
            <h2 style="margin:0;font-size:1.6rem;font-weight:700;">✉️ New Contact Message</h2>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#888;width:140px;">Name</td><td style="color:#f0f0f5;font-weight:600;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:10px 0;color:#888;">Email</td><td><a href="mailto:${email}" style="color:#d4a03a;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#888;">Regarding</td><td style="color:#f0f0f5;">${regarding}</td></tr>
            </table>
            <div style="margin-top:20px;padding:20px;background:#18181f;border-radius:12px;border-left:4px solid #d4a03a;">
              <p style="margin:0 0 8px;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="margin:0;color:#f0f0f5;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="margin-top:20px;color:#555;font-size:0.78rem;text-align:center;">Sent from CA Ruchita Parmar Portfolio</p>
          </div>
        </div>
      `,
    });

    // 2. Auto-reply to visitor — plain text + HTML, replyTo set to owner
    await transporter.sendMail({
      from: `"CA Ruchita Parmar" <${user}>`,
      to: email,
      replyTo: user,
      subject: `Re: ${regarding} — received your message`,
      text: `Hi ${firstName},\n\nThank you for reaching out. I have received your message about "${regarding}" and will get back to you within 24–48 hours.\n\nYour message:\n${message}\n\n— CA Ruchita Parmar\nChartered Accountant · India\n${user}`,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#0d0d10;color:#f0f0f5;border-radius:16px;overflow:hidden;border:1px solid rgba(212,160,58,0.25);">
          <div style="background:linear-gradient(135deg,#1a1500,#0d0d10);padding:32px 32px 24px;border-bottom:1px solid rgba(212,160,58,0.2);">
            <p style="margin:0 0 6px;color:#d4a03a;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;">CA RUCHITA PARMAR · CHARTERED ACCOUNTANT</p>
            <h2 style="margin:0;font-size:1.6rem;font-weight:700;">Hi ${firstName}!</h2>
          </div>
          <div style="padding:28px 32px;">
            <p style="color:#aaa;line-height:1.8;margin:0 0 20px;">Thank you for reaching out. I have received your message regarding <strong style="color:#f0f0f5;">${regarding}</strong> and will get back to you within 24–48 hours.</p>
            <div style="padding:20px;background:#18181f;border-radius:12px;border-left:4px solid #d4a03a;">
              <p style="margin:0 0 8px;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;">Your Message</p>
              <p style="margin:0;color:#f0f0f5;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#aaa;font-size:0.9rem;">Looking forward to connecting,</p>
              <p style="margin:6px 0 0;color:#f0f0f5;font-weight:600;">CA Ruchita Parmar</p>
              <p style="margin:2px 0 0;color:#888;font-size:0.85rem;">Chartered Accountant · India</p>
              <p style="margin:2px 0 0;"><a href="mailto:${user}" style="color:#d4a03a;font-size:0.85rem;">${user}</a></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Contact route error:', msg);
    if (msg.includes('EAUTH') || msg.includes('Invalid login') || msg.includes('Username and Password')) {
      return NextResponse.json({ error: 'Email authentication failed. Please contact directly at caruchita2002@gmail.com' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to send message. Please try again or contact directly.' }, { status: 500 });
  }
}
