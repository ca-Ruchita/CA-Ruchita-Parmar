import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function generateMeetCode(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8);
  const rand = Math.random().toString(36).slice(2, 7);
  return `ca-ruchita-${clean}-${rand}`;
}

function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, date, time, timezone, topic, description } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const meetCode = generateMeetCode(name);
    const meetUrl = `https://meet.jit.si/${meetCode}`;
    const meetPin = generatePin();

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER || '';
    const pass = (process.env.SMTP_PASS || '').replace(/\s/g, '');
    const contactEmail = process.env.CONTACT_EMAIL || user;

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
      });

      const descriptionBlock = description
        ? `<tr><td style="padding:10px 0;color:#888;width:140px;vertical-align:top;">Notes</td><td style="color:#f0f0f5;line-height:1.6;">${description.replace(/\n/g, '<br>')}</td></tr>`
        : '';

      const descriptionText = description ? `\nNotes: ${description}` : '';

      // 1. Notify owner
      await transporter.sendMail({
        from: `"Portfolio Scheduler" <${user}>`,
        to: contactEmail,
        replyTo: email,
        subject: `New call booked: ${name} — ${date} at ${time}`,
        text: `New 30-min call booked.\n\nClient: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time} (${timezone})\nTopic: ${topic || 'General Consultation'}${descriptionText}\n\nMeeting link: ${meetUrl}\nPIN: ${meetPin}`,
        html: `
          <div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#0d0d10;color:#f0f0f5;border-radius:16px;overflow:hidden;border:1px solid rgba(212,160,58,0.25);">
            <div style="background:linear-gradient(135deg,#1a1500,#0d0d10);padding:32px 32px 24px;border-bottom:1px solid rgba(212,160,58,0.2);">
              <p style="margin:0 0 6px;color:#d4a03a;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;">CA RUCHITA PARMAR · PORTFOLIO</p>
              <h2 style="margin:0;font-size:1.6rem;font-weight:700;">📅 New Call Booked</h2>
              <p style="margin:8px 0 0;color:#aaa;font-size:0.9rem;">Someone has scheduled a 30-minute consultation with you.</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;color:#888;width:140px;">Client Name</td><td style="color:#f0f0f5;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:10px 0;color:#888;">Client Email</td><td><a href="mailto:${email}" style="color:#d4a03a;text-decoration:none;">${email}</a></td></tr>
                <tr><td style="padding:10px 0;color:#888;">Date</td><td style="color:#f0f0f5;">${date}</td></tr>
                <tr><td style="padding:10px 0;color:#888;">Time</td><td style="color:#f0f0f5;">${time} &nbsp;<span style="color:#888;font-size:0.85em;">(${timezone})</span></td></tr>
                <tr><td style="padding:10px 0;color:#888;">Duration</td><td style="color:#f0f0f5;">30 minutes</td></tr>
                <tr><td style="padding:10px 0;color:#888;">Call Type</td><td style="color:#f0f0f5;">${topic || 'General Consultation'}</td></tr>
                ${descriptionBlock}
              </table>
              <div style="margin:24px 0;padding:20px;background:#18181f;border-radius:12px;border:1px solid rgba(212,160,58,0.25);">
                <p style="margin:0 0 12px;color:#d4a03a;font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Meeting Details</p>
                <p style="margin:0 0 6px;color:#aaa;font-size:0.85rem;">Room Link</p>
                <a href="${meetUrl}" style="color:#d4a03a;word-break:break-all;font-size:0.9rem;">${meetUrl}</a>
                <p style="margin:12px 0 6px;color:#aaa;font-size:0.85rem;">Room PIN</p>
                <span style="font-size:1.5rem;font-weight:700;letter-spacing:6px;color:#f0f0f5;">${meetPin}</span>
              </div>
              <div style="text-align:center;">
                <a href="${meetUrl}" style="display:inline-block;background:#d4a03a;color:#000;padding:14px 36px;border-radius:100px;text-decoration:none;font-weight:700;font-size:0.95rem;">🎥 Open Meeting Room</a>
              </div>
            </div>
          </div>
        `,
      });

      // 2. Confirm to visitor — plain text + HTML, replyTo set to owner
      await transporter.sendMail({
        from: `"CA Ruchita Parmar" <${user}>`,
        to: email,
        replyTo: user,
        subject: `Your call is confirmed — ${date} at ${time}`,
        text: `Hi ${name},\n\nYour 30-minute consultation with CA Ruchita Parmar is confirmed.\n\nDate: ${date}\nTime: ${time} (${timezone})\nTopic: ${topic || 'General Consultation'}${descriptionText}\n\nJoin here: ${meetUrl}\nRoom PIN: ${meetPin}\n\nPlease join 2–3 minutes early. No download needed — works in any browser.\n\n— CA Ruchita Parmar\nChartered Accountant · India\n${user}`,
        html: `
          <div style="font-family:'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#0d0d10;color:#f0f0f5;border-radius:16px;overflow:hidden;border:1px solid rgba(212,160,58,0.25);">
            <div style="background:linear-gradient(135deg,#1a1500,#0d0d10);padding:32px 32px 24px;border-bottom:1px solid rgba(212,160,58,0.2);">
              <p style="margin:0 0 6px;color:#d4a03a;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;font-weight:600;">CA RUCHITA PARMAR · CHARTERED ACCOUNTANT</p>
              <h2 style="margin:0;font-size:1.6rem;font-weight:700;">Your call is confirmed</h2>
              <p style="margin:8px 0 0;color:#aaa;font-size:0.9rem;">Hi ${name}, here are your booking details.</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;color:#888;width:140px;">Date</td><td style="color:#f0f0f5;font-weight:600;">${date}</td></tr>
                <tr><td style="padding:10px 0;color:#888;">Time</td><td style="color:#f0f0f5;font-weight:600;">${time} &nbsp;<span style="color:#888;font-size:0.85em;">(${timezone})</span></td></tr>
                <tr><td style="padding:10px 0;color:#888;">Duration</td><td style="color:#f0f0f5;">30 minutes</td></tr>
                <tr><td style="padding:10px 0;color:#888;">Topic</td><td style="color:#f0f0f5;">${topic || 'General Consultation'}</td></tr>
                ${descriptionBlock}
              </table>

              <div style="margin:24px 0;padding:20px;background:#18181f;border-radius:12px;border:1px solid rgba(212,160,58,0.25);">
                <p style="margin:0 0 12px;color:#d4a03a;font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;">How to Join</p>
                <p style="margin:0 0 6px;color:#aaa;font-size:0.85rem;">Meeting Link</p>
                <a href="${meetUrl}" style="color:#d4a03a;word-break:break-all;font-size:0.9rem;">${meetUrl}</a>
                <p style="margin:12px 0 6px;color:#aaa;font-size:0.85rem;">Room PIN (enter when prompted)</p>
                <span style="font-size:1.5rem;font-weight:700;letter-spacing:6px;color:#f0f0f5;">${meetPin}</span>
                <p style="margin:12px 0 0;color:#666;font-size:0.78rem;">Please join 2–3 minutes early. No download needed — works in Chrome, Firefox, Safari.</p>
              </div>

              <div style="text-align:center;margin-bottom:8px;">
                <a href="${meetUrl}" style="display:inline-block;background:#d4a03a;color:#000;padding:14px 36px;border-radius:100px;text-decoration:none;font-weight:700;font-size:0.95rem;">🎥 Join Meeting Room</a>
              </div>

              <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0;color:#aaa;font-size:0.9rem;">Looking forward to speaking with you,</p>
                <p style="margin:6px 0 0;color:#f0f0f5;font-weight:600;">CA Ruchita Parmar</p>
                <p style="margin:2px 0 0;color:#888;font-size:0.85rem;">Chartered Accountant · India</p>
                <p style="margin:2px 0 0;"><a href="mailto:${user}" style="color:#d4a03a;font-size:0.85rem;">${user}</a></p>
              </div>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, meetUrl, meetPin });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
