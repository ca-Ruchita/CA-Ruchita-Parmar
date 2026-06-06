'use client';
import { useState } from 'react';
import Cursor from '@/components/Cursor';
import ParticleCanvas from '@/components/ParticleCanvas';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import ThemePanel from '@/components/ThemePanel';
import TiltCards from '@/components/TiltCards';
import InteractionEffects from '@/components/InteractionEffects';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertsSection from '@/components/CertsSection';
import EducationSection from '@/components/EducationSection';
import AchievementsSection from '@/components/AchievementsSection';
import ToolsSection from '@/components/ToolsSection';
import ContentSection from '@/components/ContentSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CalculatorModal from '@/components/CalculatorModal';
import MeetingScheduler from '@/components/MeetingScheduler';

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [schedOpen, setSchedOpen] = useState(false);

  return (
    <>
      <Cursor />
      <ParticleCanvas />
      <ScrollProgress />
      <TiltCards />
      <InteractionEffects />

      <Navbar onSchedule={() => setSchedOpen(true)} />
      <ThemePanel />

      <main>
        <HeroSection onSchedule={() => setSchedOpen(true)} />
        <AboutSection />
        <div className="grad-sep" />
        <ExperienceSection />
        <div className="grad-sep" />
        <SkillsSection />
        <div className="grad-sep" />
        <CertsSection />
        <div className="grad-sep" />
        <EducationSection />
        <div className="grad-sep" />
        <AchievementsSection />
        <div className="grad-sep" />
        <ToolsSection onOpen={id => setActiveTool(id)} />
        <CalculatorModal
          toolId={activeTool}
          onClose={() => setActiveTool(null)}
          onNavigate={id => setActiveTool(id)}
        />
        <div className="grad-sep" />
        <ContentSection />
        <div className="grad-sep" />
        <ContactSection onSchedule={() => setSchedOpen(true)} />
      </main>

      <Footer />

      <MeetingScheduler
        open={schedOpen}
        onClose={() => setSchedOpen(false)}
      />
    </>
  );
}
