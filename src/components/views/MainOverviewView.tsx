import React, { useState } from 'react';
import { IMAGES, METHODS_DATA, FORMATS_DATA } from '../../data/content';
import { ActiveScreen } from '../../types';

interface MainOverviewViewProps {
  onNavigateToScreen: (screen: ActiveScreen) => void;
  onOpenBooking: (prefillFormat?: string) => void;
}

export const MainOverviewView: React.FC<MainOverviewViewProps> = ({
  onNavigateToScreen,
  onOpenBooking,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    format: 'einzel',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        format: 'einzel',
        message: '',
      });
    }, 450);
  };

  return (
    <div className="flex flex-col w-full text-[#1c1c1a]">
      {/* 1. SECTION: WELCOME (HERO) */}
      <section className="w-full px-5 md:px-8 lg:px-16 pt-10 md:pt-16 pb-16 md:pb-24 max-w-[1400px] mx-auto">
        {/* Headline & Editorial Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-16">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
              Atelier für Systemische & Theatrale Prozessbegleitung
            </p>
            <h1 className="font-serif text-[38px] leading-[44px] md:text-[54px] md:leading-[62px] text-[#1c1c1a] tracking-tight font-normal">
              Erfahrungsbasierte Supervision für Teams, Gruppen und Einzelne.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-8">
            <p className="font-sans text-[15px] md:text-[16px] text-[#5f5f59] leading-relaxed">
              Ein geschützter Raum für professionelle Rollenklärung, verdeckte Beziehungsdynamiken und komplexe Praxisfälle – mit handfesten theatralen, skulpturalen und materiellen Methoden.
            </p>
          </div>
        </div>

        {/* Core Quote Block */}
        <div className="bg-[#f6f3ef] p-6 md:p-12 mb-12 md:mb-16 relative overflow-hidden border border-[#e5e2de]/60">
          <div className="max-w-4xl relative z-10">
            <span className="block font-serif italic text-[24px] leading-[34px] md:text-[32px] md:leading-[44px] text-[#1c1c1a]">
              „Der direkte Weg zeigt, was Sie schon wissen. Hier zeigt sich, was Sie noch nicht gesehen haben.“
            </span>
            <p className="font-sans text-[11px] md:text-[12px] text-[#5f5f59] uppercase tracking-wider mt-3">
              — Elena Vance, Klares Atelier
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
            <button
              onClick={() => onOpenBooking()}
              className="inline-block font-sans text-[14px] font-medium bg-[#13332f] text-white px-8 py-3.5 hover:bg-[#2e2f2a] transition-colors shadow-sm"
            >
              Unverbindliches Erstgespräch vereinbaren
            </button>
            <a
              href="#methoden"
              className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-[#13332f] hover:text-[#1c1c1a] transition-colors py-2 px-1 underline decoration-[#13332f] underline-offset-4"
            >
              <span>Methoden & Materialien entdecken</span>
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Studio Display */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#f0edea]">
          <img
            className="w-full h-full object-cover"
            alt="Atelierimpression: Ton, Arbeitswerkzeuge & gewebte Leinenstoffe im Tageslicht"
            src={IMAGES.hero}
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-[#fcf9f5]/90 backdrop-blur-sm px-4 py-2 border border-[#e5e2de]/80">
            <p className="font-serif text-sm italic text-[#1c1c1a]">
              Atelierimpression: Ton, Arbeitswerkzeuge & gewebte Leinenstoffe im Tageslicht.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECTION: METHODEN & MATERIALIEN */}
      <section className="w-full bg-[#f6f3ef] py-16 md:py-24 px-5 md:px-8 lg:px-16" id="methoden">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                01 / METHODEN & MATERIALIEN
              </p>
            </div>
            <div className="lg:col-span-9 space-y-3">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] font-normal">
                Vom Reden ins Greifen: Wie wir arbeiten.
              </h2>
              <p className="font-sans text-[16px] md:text-[18px] text-[#5f5f59] max-w-3xl leading-relaxed">
                Supervision bleibt oft im rein Kognitiven verhaftet. Wenn wir Situationen jedoch mit Material im Raum verorten, werden verdeckte Beziehungsgefüge, Machtachsen und Ressourcen sofort physisch spürbar und verhandelbar.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToScreen('methoden-lab')}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#13332f] hover:underline"
                >
                  <span>→ Zum interaktiven Aufstellungs-Labor (Figuren-Simulator öffnen)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Photo Feature + 4 Pillars Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Pillar Cards Left Column (2 Cards) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white p-6 md:p-8 flex-1 shadow-sm flex flex-col justify-between border border-[#e5e2de]/60">
                <div>
                  <span className="font-serif text-[22px] italic text-[#5f5f59] block mb-2">01</span>
                  <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-2 font-normal">
                    {METHODS_DATA[0].title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                    {METHODS_DATA[0].description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#f0edea]">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] font-medium">
                    Werkzeuge: {METHODS_DATA[0].tools}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 flex-1 shadow-sm flex flex-col justify-between border border-[#e5e2de]/60">
                <div>
                  <span className="font-serif text-[22px] italic text-[#5f5f59] block mb-2">02</span>
                  <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-2 font-normal">
                    {METHODS_DATA[1].title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                    {METHODS_DATA[1].description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#f0edea]">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] font-medium">
                    Werkzeuge: {METHODS_DATA[1].tools}
                  </span>
                </div>
              </div>
            </div>

            {/* Integrated Visual Center Pillar */}
            <div className="lg:col-span-4 flex flex-col bg-white overflow-hidden shadow-sm border border-[#e5e2de]/60">
              <div className="relative flex-1 min-h-[380px]">
                <img
                  alt="Materialien im Atelier: Handgeschnitzte Figuren, Flusssteine und Naturseiden"
                  className="w-full h-full object-cover"
                  src={IMAGES.materials}
                />
              </div>
              <div className="p-4 md:p-5 bg-[#ebe8e4]">
                <p className="font-serif text-sm italic text-[#1c1c1a]">
                  Materialien im Atelier: Handgeschnitzte Figuren, Flusssteine und Naturseiden zur räumlichen Anordnung.
                </p>
              </div>
            </div>

            {/* Pillar Cards Right Column (2 Cards) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white p-6 md:p-8 flex-1 shadow-sm flex flex-col justify-between border border-[#e5e2de]/60">
                <div>
                  <span className="font-serif text-[22px] italic text-[#5f5f59] block mb-2">03</span>
                  <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-2 font-normal">
                    {METHODS_DATA[2].title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                    {METHODS_DATA[2].description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#f0edea]">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] font-medium">
                    Werkzeuge: {METHODS_DATA[2].tools}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 flex-1 shadow-sm flex flex-col justify-between border border-[#e5e2de]/60">
                <div>
                  <span className="font-serif text-[22px] italic text-[#5f5f59] block mb-2">04</span>
                  <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-2 font-normal">
                    {METHODS_DATA[3].title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                    {METHODS_DATA[3].description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#f0edea]">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] font-medium">
                    Werkzeuge: {METHODS_DATA[3].tools}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: FÜR WEN */}
      <section className="w-full py-16 md:py-24 px-5 md:px-8 lg:px-16" id="fuer-wen">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                02 / FÜR WEN
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] font-normal">
                Formate für unterschiedliche Konstellationen.
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-[#5f5f59] mt-2 max-w-2xl leading-relaxed">
                Passgenaue Rahmungen für fokussierte Tiefenarbeit – vom vertraulichen Zweier-Setting bis zur komplexen Teamklausur.
              </p>
            </div>
          </div>

          {/* 3 Structured Format Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Einzel */}
            <div className="bg-[#f6f3ef] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e5e2de]/60">
              <div>
                <div className="w-10 h-10 bg-[#e5e2de] flex items-center justify-center text-[#13332f] mb-6">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <h3 className="font-serif text-[24px] md:text-[26px] text-[#1c1c1a] mb-2 font-normal">
                  {FORMATS_DATA[0].title}
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] mb-4 font-semibold">
                  {FORMATS_DATA[0].kicker}
                </p>
                <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed mb-6">
                  {FORMATS_DATA[0].description}
                </p>
                <ul className="space-y-2 text-[13px] font-sans text-[#1c1c1a]">
                  {FORMATS_DATA[0].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#13332f]">check</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-[#e5e2de]">
                <button
                  onClick={() => onOpenBooking('einzel')}
                  className="font-sans text-[14px] text-[#13332f] hover:text-[#1c1c1a] transition-colors flex items-center gap-1 font-medium group"
                >
                  <span>Format anfragen</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: Kleingruppe */}
            <div className="bg-[#f0edea] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e5e2de]/70">
              <div>
                <div className="w-10 h-10 bg-[#e5e2de] flex items-center justify-center text-[#13332f] mb-6">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                </div>
                <h3 className="font-serif text-[24px] md:text-[26px] text-[#1c1c1a] mb-2 font-normal">
                  {FORMATS_DATA[1].title}
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] mb-4 font-semibold">
                  {FORMATS_DATA[1].kicker}
                </p>
                <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed mb-6">
                  {FORMATS_DATA[1].description}
                </p>
                <ul className="space-y-2 text-[13px] font-sans text-[#1c1c1a]">
                  {FORMATS_DATA[1].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#13332f]">check</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-[#e5e2de]">
                <button
                  onClick={() => onNavigateToScreen('fuer-wen')}
                  className="font-sans text-[14px] text-[#13332f] hover:text-[#1c1c1a] transition-colors flex items-center gap-1 font-medium group"
                >
                  <span>Freie Plätze prüfen</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 3: Teamsupervision */}
            <div className="bg-[#f6f3ef] p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e5e2de]/60">
              <div>
                <div className="w-10 h-10 bg-[#e5e2de] flex items-center justify-center text-[#13332f] mb-6">
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                </div>
                <h3 className="font-serif text-[24px] md:text-[26px] text-[#1c1c1a] mb-2 font-normal">
                  {FORMATS_DATA[2].title}
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#13332f] mb-4 font-semibold">
                  {FORMATS_DATA[2].kicker}
                </p>
                <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed mb-6">
                  {FORMATS_DATA[2].description}
                </p>
                <ul className="space-y-2 text-[13px] font-sans text-[#1c1c1a]">
                  {FORMATS_DATA[2].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#13332f]">check</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-[#e5e2de]">
                <button
                  onClick={() => onOpenBooking('team')}
                  className="font-sans text-[14px] text-[#13332f] hover:text-[#1c1c1a] transition-colors flex items-center gap-1 font-medium group"
                >
                  <span>Teamangebot anfordern</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: HALTUNG */}
      <section className="w-full bg-[#ebe8e4] py-16 md:py-24 px-5 md:px-8 lg:px-16" id="haltung">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                03 / HALTUNG & VERSTÄNDNIS
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] max-w-3xl font-normal">
                Sie sind Expert:in für Ihr Anliegen. Ich biete Raum, Material und Methode.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 md:p-8 shadow-sm border border-[#e5e2de]/60">
              <span className="font-sans text-[11px] text-[#13332f] tracking-widest uppercase block mb-3 font-semibold">
                Prämisse 01
              </span>
              <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-3 font-normal">
                Keine Esoterik, kein Guru-Tum
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                Fundierte Prozessbegleitung auf wissenschaftlich gesicherter Basis von Theatertherapie, systemischer Organisationstheorie und Gruppendynamik. Wir suchen keine Erleuchtung, sondern praxistaugliche Klarheit für den beruflichen Alltag.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-sm border border-[#e5e2de]/60">
              <span className="font-sans text-[11px] text-[#13332f] tracking-widest uppercase block mb-3 font-semibold">
                Prämisse 02
              </span>
              <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-3 font-normal">
                Körper & Material lügen nicht
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                Während gesprochene Sprache oft rationalisiert, abwehrt und rechtfertigt, deckt die räumlich-haptische Platzierung von Material die unausgesprochene Realität unverzüglich und vorurteilsfrei auf.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-sm border border-[#e5e2de]/60">
              <span className="font-sans text-[11px] text-[#13332f] tracking-widest uppercase block mb-3 font-semibold">
                Prämisse 03
              </span>
              <h3 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] mb-3 font-normal">
                Lösungsorientiert & handlungsfähig
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59] leading-relaxed">
                Am Ende jeder Sitzung steht keine bloße Katharsis, sondern ein tragfähiger nächster Schritt. Wir verankern neue Erkenntnisse in konkreten Verhaltensweisen, Vereinbarungen und Entlastungsstrategien.
              </p>
            </div>
          </div>

          {/* Compact Quote Anchor */}
          <div className="mt-12 bg-[#f0edea] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#e5e2de]">
            <p className="font-serif text-[20px] md:text-[22px] italic text-[#1c1c1a] max-w-2xl">
              „Kreative Methoden sind kein Selbstzweck – sie sind das präziseste Seziermesser für Beziehungsstrukturen.“
            </p>
            <span className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-widest whitespace-nowrap">
              DGSv-Standard verankert
            </span>
          </div>
        </div>
      </section>

      {/* 5. SECTION: ÜBER MICH */}
      <section className="w-full py-16 md:py-24 px-5 md:px-8 lg:px-16" id="ueber-mich">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 md:mb-12">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                04 / ÜBER MICH
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] font-normal">
                Hintergrund & Arbeitsweise.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Portrait Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative w-full aspect-[3/4] bg-[#f0edea] overflow-hidden shadow-sm flex-1">
                <img
                  alt="Elena Vance im Atelier Berlin-Prenzlauer Berg"
                  className="w-full h-full object-cover"
                  src={IMAGES.portrait}
                />
              </div>
              <div className="pt-2">
                <p className="font-serif text-sm italic text-[#5f5f59]">
                  Elena Vance im Atelier Berlin-Prenzlauer Berg.
                </p>
              </div>
            </div>

            {/* Biography / Qualifications Column */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#f6f3ef] p-6 md:p-10 border border-[#e5e2de]/60">
              <div className="space-y-6">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                    Profil & Werdegang
                  </span>
                  <h3 className="font-serif text-[26px] md:text-[28px] text-[#1c1c1a] mt-1 font-normal">
                    Elena Vance
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] text-[#5f5f59]">
                    Zertifizierte Supervisorin (DGSv i.A.), Theatertherapeutin (BCTC / DGfT), Dipl.-Kulturpädagogin.
                  </p>
                </div>

                <div className="space-y-4 text-[14px] md:text-[15px] font-sans text-[#1c1c1a] leading-relaxed">
                  <p>
                    Seit über 15 Jahren arbeite ich an den Schnittstellen von psychosozialer Arbeit, künstlerischem Ausdruck und professioneller Teamführung. Ausgebildet in darstellender Theatertherapie und systemischer Gruppenanalyse, kenne ich sowohl die Intensität des klinischen Alltags als auch die komplexen Dynamiken freier Träger und agiler Organisationen.
                  </p>
                  <p>
                    In meiner Arbeit schaffe ich Bedingungen, in denen Überlastung und Widersprüche nicht weggewischt, sondern plastisch betrachtet werden dürfen. Meine Haltung ist ruhig, unaufgeregt, humorvoll und methodisch streng strukturiert.
                  </p>
                </div>

                {/* Qualification Accordion / Details */}
                <div className="bg-[#f0edea] p-5 space-y-2 border border-[#e5e2de]">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#1c1c1a]">
                    Qualitätsstandards & Mitgliedschaften
                  </p>
                  <ul className="text-[13px] font-sans text-[#5f5f59] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#13332f]"></span>
                      <span>Deutsche Gesellschaft für Supervision und Coaching (DGSv i.A.)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#13332f]"></span>
                      <span>Deutsche Gesellschaft für Theatertherapie (DGfT)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#13332f]"></span>
                      <span>Laufende eigene Lehr- und Kontrollsupervision zur Qualitätssicherung</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#e5e2de] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-sans text-[12px] text-[#5f5f59]">
                  Sprachen: Deutsch / Englisch
                </span>
                <button
                  onClick={() => onOpenBooking()}
                  className="font-sans text-[14px] text-[#13332f] hover:text-[#1c1c1a] transition-colors flex items-center gap-1 font-semibold group self-start sm:self-auto"
                >
                  <span>Kontakt aufnehmen</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: PREISE & TRANSPARENZ */}
      <section className="w-full bg-[#f6f3ef] py-16 md:py-24 px-5 md:px-8 lg:px-16" id="preise">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                05 / PREISE & TRANSPARENZ
              </p>
            </div>
            <div className="lg:col-span-9 space-y-2">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] font-normal">
                Klare Konditionen ohne Überraschungen.
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-[#5f5f59] max-w-2xl leading-relaxed">
                Transparente Honorare für planbare professionelle Begleitung. Raumkosten im Berliner Atelier sind stets enthalten.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigateToScreen('rechner')}
                  className="text-[13px] font-medium text-[#13332f] hover:underline"
                >
                  → Zum interaktiven Honorarrechner & Angebotskonfigurator
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tier 1 */}
            <div className="bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#e5e2de]/60">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#5f5f59]">
                  1:1 Format
                </span>
                <h3 className="font-serif text-[24px] text-[#1c1c1a] mt-1 mb-4 font-normal">
                  Einzelsupervision
                </h3>
                <div className="mb-6">
                  <span className="font-serif text-[36px] md:text-[40px] text-[#13332f] font-normal">
                    140 €
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59] block mt-1">
                    pro Sitzung (60 Min) für Selbstzahler:innen
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59]">
                    180 € bei Übernahme durch Organisationen (zzgl. USt.)
                  </span>
                </div>
                <p className="font-sans text-[13px] text-[#5f5f59] leading-relaxed">
                  Fokussierte Sitzungen für Rollenprofilierung, akute Fallanalysen und persönliche Entlastung.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#f0edea]">
                <button
                  onClick={() => onOpenBooking('einzel')}
                  className="block text-center w-full font-sans text-[14px] font-medium bg-[#ebe8e4] text-[#1c1c1a] py-3 hover:bg-[#e5e2de] transition-colors"
                >
                  Termin anfragen
                </button>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#e5e2de]/60">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#5f5f59]">
                  Kollegiale Runde
                </span>
                <h3 className="font-serif text-[24px] text-[#1c1c1a] mt-1 mb-4 font-normal">
                  Fall- & Gruppensupervision
                </h3>
                <div className="mb-6">
                  <span className="font-serif text-[36px] md:text-[40px] text-[#13332f] font-normal">
                    240 €
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59] block mt-1">
                    pro Sitzung (90 Min)
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59]">
                    Für Gruppen bis maximal 5 Personen
                  </span>
                </div>
                <p className="font-sans text-[13px] text-[#5f5f59] leading-relaxed">
                  Austausch und Vertiefung mit interdisziplinärem Resonanzraum. Kosten können in der Gruppe aufgeteilt werden.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#f0edea]">
                <button
                  onClick={() => onOpenBooking('gruppe')}
                  className="block text-center w-full font-sans text-[14px] font-medium bg-[#ebe8e4] text-[#1c1c1a] py-3 hover:bg-[#e5e2de] transition-colors"
                >
                  Gruppe anfragen
                </button>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#e5e2de]/60">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#5f5f59]">
                  Team & System
                </span>
                <h3 className="font-serif text-[24px] text-[#1c1c1a] mt-1 mb-4 font-normal">
                  Teamsupervision
                </h3>
                <div className="mb-6">
                  <span className="font-serif text-[36px] md:text-[40px] text-[#13332f] font-normal">
                    ab 320 €
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59] block mt-1">
                    pro Einheit (120–180 Min) zzgl. USt.
                  </span>
                  <span className="font-sans text-[13px] text-[#5f5f59]">
                    Halbtages- und Klausurtage auf Anfrage
                  </span>
                </div>
                <p className="font-sans text-[13px] text-[#5f5f59] leading-relaxed">
                  Für Institutionen, Praxisteams und Organisationen. Inklusive Vor- und Nachbereitung sowie individueller Zielvereinbarung.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#f0edea]">
                <button
                  onClick={() => onOpenBooking('team')}
                  className="block text-center w-full font-sans text-[14px] font-medium bg-[#13332f] text-white py-3 hover:bg-[#2e2f2a] transition-colors"
                >
                  Angebot anfragen
                </button>
              </div>
            </div>
          </div>

          {/* Free Consultation Banner */}
          <div className="mt-12 bg-white p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm border border-[#e5e2de]">
            <div>
              <h4 className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] font-normal">
                Unverbindliches Orientierungsgespräch
              </h4>
              <p className="font-sans text-[13px] text-[#5f5f59] mt-1">
                Ein 30-minütiges Gespräch via Telefon oder Video ist kostenfrei und klärt gegenseitige Erwartungen und Passung.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="inline-block font-sans text-[14px] font-medium bg-[#13332f] text-white px-6 py-2.5 hover:bg-[#2e2f2a] transition-colors whitespace-nowrap shadow-sm"
            >
              Orientierung buchen
            </button>
          </div>
        </div>
      </section>

      {/* 7. SECTION: KONTAKT & ERSTGESPRÄCH */}
      <section className="w-full py-16 md:py-24 px-5 md:px-8 lg:px-16" id="kontakt">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-widest text-[#13332f] font-semibold">
                06 / KONTAKT
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-serif text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1c1c1a] font-normal">
                Ein unverbindliches Gespräch beginnen.
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-[#5f5f59] mt-2 max-w-2xl leading-relaxed">
                Beschreiben Sie kurz Ihr Anliegen oder hinterlassen Sie eine Telefonnummer für einen direkten Rückruf.
              </p>
            </div>
          </div>

          {/* Main Form + Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Component (Sharp, 1px lines, Warm Palette) */}
            <div className="lg:col-span-7 bg-[#f6f3ef] p-6 md:p-10 shadow-sm border border-[#e5e2de]/60">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-wider font-medium" htmlFor="name">
                      Ihr Name *
                    </label>
                    <input
                      className="w-full bg-white px-4 py-3 text-[15px] text-[#1c1c1a] placeholder:text-[#5f5f59]/50 border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                      id="name"
                      placeholder="Vor- und Nachname"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-wider font-medium" htmlFor="email">
                      E-Mail-Adresse *
                    </label>
                    <input
                      className="w-full bg-white px-4 py-3 text-[15px] text-[#1c1c1a] placeholder:text-[#5f5f59]/50 border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                      id="email"
                      placeholder="ihre.adresse@domain.de"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-wider font-medium" htmlFor="phone">
                      Telefonnummer (optional)
                    </label>
                    <input
                      className="w-full bg-white px-4 py-3 text-[15px] text-[#1c1c1a] placeholder:text-[#5f5f59]/50 border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                      id="phone"
                      placeholder="+49 ..."
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-wider font-medium" htmlFor="format">
                      Gewünschtes Format
                    </label>
                    <select
                      className="w-full bg-white px-4 py-3 text-[15px] text-[#1c1c1a] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                      id="format"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    >
                      <option value="einzel">Einzelsupervision</option>
                      <option value="gruppe">Kleingruppen-Supervision</option>
                      <option value="team">Teamsupervision & Klausurtag</option>
                      <option value="beratung">Noch unentschieden / Beratung</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[11px] text-[#5f5f59] uppercase tracking-wider font-medium" htmlFor="message">
                    Kurze Skizze Ihres Anliegens
                  </label>
                  <textarea
                    className="w-full bg-white px-4 py-3 text-[15px] text-[#1c1c1a] placeholder:text-[#5f5f59]/50 border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f] resize-y"
                    id="message"
                    placeholder="Welches Thema, welche Dynamik oder welcher Praxisfall beschäftigt Sie aktuell?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    disabled={submitting}
                    className="font-sans text-[14px] font-medium bg-[#13332f] text-white px-8 py-3.5 hover:bg-[#2e2f2a] transition-colors shadow-sm disabled:opacity-70"
                    type="submit"
                  >
                    {submitting ? 'Wird übermittelt...' : 'Anfrage absenden'}
                  </button>
                  <span className="text-[12px] text-[#5f5f59]">
                    * Pflichtfelder
                  </span>
                </div>

                {/* Client Success Feedback Note */}
                {formSubmitted && (
                  <div className="p-4 bg-[#13332f] text-white text-[14px] font-sans flex items-start gap-3 mt-4">
                    <span className="material-symbols-outlined text-[20px] text-emerald-300">check_circle</span>
                    <div>
                      <p className="font-medium">Vielen Dank für Ihre Anfrage!</p>
                      <p className="text-[13px] text-white/90 mt-0.5">
                        Ich melde mich verlässlich innerhalb von zwei Werktagen persönlich bei Ihnen, um das weitere Vorgehen zu besprechen.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Atelier Details & Location Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#f0edea] p-6 md:p-10 shadow-sm border border-[#e5e2de]">
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                    Atelier & Anschrift
                  </p>
                  <h3 className="font-serif text-[22px] md:text-[24px] text-[#1c1c1a] mt-1 font-normal">
                    Klares Atelier
                  </h3>
                  <p className="font-sans text-[14px] text-[#5f5f59] mt-1">
                    Raum für systemische & theatrale Prozessbegleitung
                  </p>
                </div>

                <div className="space-y-4 font-sans text-[14px] text-[#1c1c1a]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#13332f] text-[20px] mt-0.5">location_on</span>
                    <div>
                      <p className="font-medium">Lindenallee 42, Atelierhaus Hof 3</p>
                      <p className="text-[#5f5f59]">10405 Berlin (Prenzlauer Berg)</p>
                      <p className="font-sans text-[12px] text-[#5f5f59] mt-1 leading-snug">
                        Vor-Ort-Sitzungen bei Teams und Organisationen bundesweit nach Vereinbarung.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#13332f] text-[20px]">mail</span>
                    <a className="hover:text-[#13332f] transition-colors underline decoration-[#13332f]/30" href="mailto:kontakt@klares-atelier.de">
                      kontakt@klares-atelier.de
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#13332f] text-[20px]">accessible</span>
                    <span className="text-[#5f5f59] text-[13px]">
                      Barrierefreier Zugang, Aufzug im Hof vorhanden.
                    </span>
                  </div>
                </div>

                {/* Map Module */}
                <div className="mt-4">
                  <div
                    className="w-full h-44 bg-[#ebe8e4] bg-cover bg-center shadow-sm relative flex items-end p-3 border border-[#e5e2de]"
                    style={{ backgroundImage: `url(${IMAGES.map})` }}
                  >
                    <div className="bg-[#fcf9f5]/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-sans text-[#1c1c1a] border border-[#e5e2de]">
                      U-Bahn Senefelderplatz & Tram M2 nah
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#e5e2de] text-[12px] font-sans text-[#5f5f59]">
                <p>Vertraulichkeit und Datenschutz nach DSGVO garantiert. Keine Weitergabe Ihrer Daten.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
