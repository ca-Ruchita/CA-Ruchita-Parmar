# CA Shetal Parmar — Portfolio

## Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Custom CSS with CSS variables (6 color themes × 2 modes)
- **Animation**: Framer Motion
- **Charts**: Recharts (dynamically imported, SSR-safe)
- **Email**: Nodemailer (SMTP)
- **Video Meetings**: Jitsi Meet (free, no OAuth)

## Running
```
npm run dev -- --port 5000
```
Workflow: `Start application` on port 5000

## Key Features

### Finance Lab (Calculator Modal)
- Click any tool card in Finance Lab section → opens full-screen slide-in calculator modal
- **Income Tax FY 25-26**: Old vs New regime comparison, sliders, surcharge, cess, 87A rebate, bar + pie + slab charts
- **GST Calculator**: CGST/SGST/IGST, inclusive/exclusive, multi-rate bar chart
- **Business Valuation**: DCF with WACC, 5-year projections, terminal value, sensitivity analysis, line charts
- **Compliance Calendar**: Full FY 2025-26 month-by-month deadlines (GST/IT/TDS/ROC), filterable
- **ITC Eligibility Checker**: Section 17(5) reference with search and status filtering
- **Audit Risk Assessment**: Composite risk scoring, materiality calculation, radar chart

### Meeting Scheduler (Free 30-min Call)
- Multi-step UI: Date → Time → Details → Success
- 14 upcoming dates (Mon–Sat), pre-blocked unavailable slots
- 10 timezone options (India, UAE, UK, NY, LA, Singapore, Australia, Germany, Canada, Japan)
- Collects name, email, topic — sends confirmation emails to both parties
- Generates a unique Jitsi Meet room (free, browser-native, no download)
- Triggered from: Navbar "Book a Call" button, Hero section, Contact section card

### SMTP Email (Contact Form)
- Form connects to `/api/contact` route handler (nodemailer)
- Sends styled email to owner + auto-reply to visitor
- Gracefully shows error if SMTP not configured

### Themes
- 6 accent colors: Gold, Emerald, Sapphire, Rose, Violet, Copper
- Dark / Light mode
- Theme panel slides in from the right

## Environment Variables Needed (for email)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password       # Gmail: use App Password, not account password
CONTACT_EMAIL=destination@gmail.com
NEXT_PUBLIC_SMTP_READY=true       # Shows confirmation note in contact form UI
```

## File Structure
```
src/
  app/
    page.tsx              # Main client page — state for calculator + scheduler
    layout.tsx            # Root layout with Google Fonts
    globals.css           # All CSS (~1500 lines, themed)
    api/
      contact/route.ts    # SMTP email handler
      schedule/route.ts   # Meeting booking + email confirmation
  components/
    Navbar.tsx            # Navigation + "Book a Call" + active section tracking
    HeroSection.tsx       # Hero with role cycling + parallax orbs
    CalculatorModal.tsx   # Full-screen slide-in calculator with sidebar nav
    MeetingScheduler.tsx  # 30-min call scheduler bottom sheet
    ContactSection.tsx    # Contact form (SMTP) + scheduler trigger card
    ToolsSection.tsx      # Tool cards (clickable → opens calculator)
    tools/
      IncomeTaxCalc.tsx   # FY 25-26 old/new regime with recharts
      GSTCalc.tsx         # GST with pie + bar charts
      BusinessValuation.tsx # DCF model with line + bar charts
      ComplianceCalendar.tsx # Full-year deadline calendar
      ITCChecker.tsx      # ITC eligibility reference
      AuditRisk.tsx       # Risk scoring with radar chart
    ThemePanel.tsx        # Color + mode switcher
    AboutSection.tsx
    ExperienceSection.tsx
    SkillsSection.tsx
    CertsSection.tsx
    EducationSection.tsx
    AchievementsSection.tsx
    ContentSection.tsx
    Footer.tsx
    Cursor.tsx
    ParticleCanvas.tsx
    ScrollProgress.tsx
    TiltCards.tsx
    InteractionEffects.tsx
    Ticker.tsx
```
