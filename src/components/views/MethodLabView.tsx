import React, { useState } from 'react';
import { METHODS_DATA, IMAGES } from '../../data/content';
import { ConstellationFigure } from '../../types';

interface MethodLabViewProps {
  onBackToOverview: () => void;
  onOpenBooking: () => void;
}

const INITIAL_FIGURES: ConstellationFigure[] = [
  { id: '1', label: 'Ich (Rolle)', role: 'Supervisand:in', x: 200, y: 190, rotation: 0, color: '#13332f', type: 'person' },
  { id: '2', label: 'Leitung', role: 'Bereichsleitung', x: 200, y: 80, rotation: 180, color: '#2b4a45', type: 'leader' },
  { id: '3', label: 'Kollegin A', role: 'Schnittstelle', x: 100, y: 240, rotation: 45, color: '#5f5f59', type: 'person' },
  { id: '4', label: 'Praxisfall / Klient', role: 'Fokus', x: 320, y: 220, rotation: 270, color: '#8a4b38', type: 'client' },
  { id: '5', label: 'Ressource', role: 'Struktur & Haltung', x: 80, y: 90, rotation: 90, color: '#3d635b', type: 'resource' },
];

export const MethodLabView: React.FC<MethodLabViewProps> = ({ onBackToOverview, onOpenBooking }) => {
  const [selectedMethodIdx, setSelectedMethodIdx] = useState(0);
  const [figures, setFigures] = useState<ConstellationFigure[]>(INITIAL_FIGURES);
  const [activeFigureId, setActiveFigureId] = useState<string | null>('1');
  const [activeScenario, setActiveScenario] = useState<string>('individual');

  const selectedFigure = figures.find((f) => f.id === activeFigureId) || figures[0];

  const handleMove = (id: string, dx: number, dy: number) => {
    setFigures((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const newX = Math.max(40, Math.min(460, f.x + dx));
        const newY = Math.max(40, Math.min(340, f.y + dy));
        return { ...f, x: newX, y: newY };
      })
    );
  };

  const handleRotate = (id: string, deltaAngle: number) => {
    setFigures((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        return { ...f, rotation: (f.rotation + deltaAngle + 360) % 360 };
      })
    );
  };

  const loadScenario = (scenarioKey: string) => {
    setActiveScenario(scenarioKey);
    if (scenarioKey === 'conflict') {
      setFigures([
        { id: '1', label: 'Ich (Rolle)', role: 'Überlastet', x: 160, y: 200, rotation: 30, color: '#13332f', type: 'person' },
        { id: '2', label: 'Leitung', role: 'Erwartungsdruck', x: 190, y: 120, rotation: 180, color: '#2b4a45', type: 'leader' },
        { id: '3', label: 'Kollegium', role: 'Rückzug', x: 80, y: 300, rotation: 315, color: '#5f5f59', type: 'person' },
        { id: '4', label: 'Akutfall', role: 'Dauerkrise', x: 320, y: 190, rotation: 270, color: '#8a4b38', type: 'client' },
        { id: '5', label: 'Grenze (Tuch)', role: 'Territorium', x: 250, y: 170, rotation: 90, color: '#3d635b', type: 'boundary' },
      ]);
    } else if (scenarioKey === 'resource') {
      setFigures([
        { id: '1', label: 'Ich (Rolle)', role: 'Zentriert', x: 250, y: 200, rotation: 0, color: '#13332f', type: 'person' },
        { id: '2', label: 'Leitung', role: 'Begleitend', x: 380, y: 100, rotation: 210, color: '#2b4a45', type: 'leader' },
        { id: '3', label: 'Kollegium', role: 'Kooperativ', x: 120, y: 200, rotation: 90, color: '#5f5f59', type: 'person' },
        { id: '4', label: 'Auftrag / Ziel', role: 'Klar definiert', x: 250, y: 70, rotation: 180, color: '#3d635b', type: 'resource' },
        { id: '5', label: 'Entlastung', role: 'Etabliert', x: 370, y: 270, rotation: 300, color: '#5f5f59', type: 'resource' },
      ]);
    } else {
      setFigures(INITIAL_FIGURES);
    }
  };

  return (
    <div className="w-full bg-[#fcf9f5] pt-6 pb-24 text-[#1c1c1a]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#e5e2de]">
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center gap-2 text-[14px] text-[#13332f] hover:text-[#1c1c1a] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Zurück zur Atelier-Übersicht</span>
          </button>
          <span className="text-[12px] uppercase tracking-widest text-[#5f5f59]">
            Bildschirm: Methoden & Werkzeuge im Detail
          </span>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-widest text-[#13332f] font-semibold mb-2">
            Praxis-Vertiefung
          </p>
          <h1 className="font-serif text-[34px] md:text-[44px] leading-tight font-normal text-[#1c1c1a]">
            Das Methoden-Labor: Erfahrungsbasiert statt theorieverloren.
          </h1>
          <p className="font-sans text-[16px] text-[#5f5f59] mt-3 leading-relaxed">
            Erleben Sie hier, wie die vier Pfeiler des Ateliers in der Praxis ineinandergreifen – von der physischen Miniatur-Aufstellung über haptisches Formen bis zum szenischen Rollenwechsel.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {METHODS_DATA.map((m, idx) => (
            <button
              key={m.num}
              onClick={() => setSelectedMethodIdx(idx)}
              className={`text-left p-4 md:p-5 border transition-all ${
                selectedMethodIdx === idx
                  ? 'bg-white border-[#13332f] shadow-sm ring-1 ring-[#13332f]'
                  : 'bg-[#f6f3ef] border-[#e5e2de] hover:bg-white'
              }`}
            >
              <span className="font-serif text-lg italic text-[#5f5f59] block mb-1">{m.num}</span>
              <p className="font-serif text-[16px] text-[#1c1c1a] font-normal leading-snug">{m.title}</p>
              <p className="font-sans text-[11px] text-[#5f5f59] mt-2 line-clamp-1">{m.tools}</p>
            </button>
          ))}
        </div>

        {/* Detailed Screen Body based on Selected Method */}
        {selectedMethodIdx === 0 ? (
          /* TAB 01: Raum & Skulptur - Interactive Aufstellungstisch */
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-10 border border-[#e5e2de] shadow-sm">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-6 border-b border-[#f0edea]">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                    Interaktive Simulation
                  </span>
                  <h2 className="font-serif text-[26px] md:text-[30px] font-normal text-[#1c1c1a] mt-0.5">
                    Der Theatrale Aufstellungstisch
                  </h2>
                  <p className="font-sans text-[14px] text-[#5f5f59] mt-1">
                    Wählen Sie eine Figur aus, verschieben Sie deren Position oder Blickrichtung und beobachten Sie, wie Nähe, Kältezonen und Machtachsen sichtbar werden.
                  </p>
                </div>

                {/* Scenario switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-[#5f5f59] mr-1">Vignette:</span>
                  <button
                    onClick={() => loadScenario('individual')}
                    className={`px-3 py-1.5 text-[12px] border ${
                      activeScenario === 'individual'
                        ? 'bg-[#13332f] text-white border-[#13332f]'
                        : 'bg-[#f6f3ef] text-[#1c1c1a] border-[#e5e2de] hover:bg-white'
                    }`}
                  >
                    Ausgangslage
                  </button>
                  <button
                    onClick={() => loadScenario('conflict')}
                    className={`px-3 py-1.5 text-[12px] border ${
                      activeScenario === 'conflict'
                        ? 'bg-[#13332f] text-white border-[#13332f]'
                        : 'bg-[#f6f3ef] text-[#1c1c1a] border-[#e5e2de] hover:bg-white'
                    }`}
                  >
                    Spannungsfeld
                  </button>
                  <button
                    onClick={() => loadScenario('resource')}
                    className={`px-3 py-1.5 text-[12px] border ${
                      activeScenario === 'resource'
                        ? 'bg-[#13332f] text-white border-[#13332f]'
                        : 'bg-[#f6f3ef] text-[#1c1c1a] border-[#e5e2de] hover:bg-white'
                    }`}
                  >
                    Gelöste Ordnung
                  </button>
                </div>
              </div>

              {/* Aufstellung Canvas & Controller */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* The Constellation Field (Table Simulation) */}
                <div className="lg:col-span-8 bg-[#f0edea] border border-[#e5e2de] p-4 relative h-[380px] sm:h-[420px] rounded-none overflow-hidden select-none">
                  {/* Subtle Grid and Center Mark */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(#13332f 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-dashed border-[#5f5f59]/30 pointer-events-none flex items-center justify-center text-[10px] text-[#5f5f59]">
                    Fokus
                  </div>

                  {/* Rendered Figures */}
                  {figures.map((fig) => {
                    const isSelected = fig.id === activeFigureId;
                    return (
                      <div
                        key={fig.id}
                        onClick={() => setActiveFigureId(fig.id)}
                        style={{
                          left: `${fig.x}px`,
                          top: `${fig.y}px`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-150 flex flex-col items-center group ${
                          isSelected ? 'z-20 scale-105' : 'z-10 opacity-90 hover:opacity-100'
                        }`}
                      >
                        {/* Direction Arrow showing viewing direction */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center relative shadow-sm border border-white"
                          style={{
                            backgroundColor: fig.color,
                            transform: `rotate(${fig.rotation}deg)`,
                          }}
                        >
                          {/* Nose / pointer indicating sight line */}
                          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-white absolute -top-2 left-1/2 -translate-x-1/2" />
                          <span className="text-[11px] text-white font-medium">
                            {fig.label.slice(0, 2)}
                          </span>
                        </div>
                        {/* Label Badge */}
                        <span
                          className={`mt-1.5 px-2 py-0.5 text-[11px] font-sans whitespace-nowrap shadow-xs transition-colors ${
                            isSelected
                              ? 'bg-[#13332f] text-white font-medium'
                              : 'bg-white text-[#1c1c1a] border border-[#e5e2de]'
                          }`}
                        >
                          {fig.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Figure Inspector & Spatial Controls */}
                <div className="lg:col-span-4 bg-[#f6f3ef] p-6 border border-[#e5e2de] space-y-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#5f5f59]">
                      Aktive Miniatur
                    </span>
                    <h3 className="font-serif text-[20px] text-[#1c1c1a] font-normal">
                      {selectedFigure.label}
                    </h3>
                    <p className="text-[13px] text-[#5f5f59]">{selectedFigure.role}</p>
                  </div>

                  {/* Direction and Position buttons */}
                  <div className="space-y-3 pt-2 border-t border-[#e5e2de]">
                    <span className="text-[11px] uppercase tracking-wider text-[#13332f] font-semibold block">
                      Räumliche Ausrichtung
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleRotate(selectedFigure.id, -45)}
                        className="px-3 py-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">rotate_left</span>
                        <span>45° Links</span>
                      </button>
                      <button
                        onClick={() => handleRotate(selectedFigure.id, 45)}
                        className="px-3 py-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">rotate_right</span>
                        <span>45° Rechts</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 pt-2">
                      <button
                        onClick={() => handleMove(selectedFigure.id, 0, -25)}
                        className="p-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center"
                        title="Nach oben"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMove(selectedFigure.id, 0, 25)}
                        className="p-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center"
                        title="Nach unten"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleMove(selectedFigure.id, -25, 0)}
                        className="p-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center"
                        title="Nach links"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => handleMove(selectedFigure.id, 25, 0)}
                        className="p-2 bg-white text-[12px] border border-[#e5e2de] hover:bg-[#ebe8e4] flex items-center justify-center"
                        title="Nach rechts"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* Supervisor's Observation Panel */}
                  <div className="bg-white p-4 border border-[#e5e2de] space-y-2">
                    <p className="font-serif italic text-[14px] text-[#13332f]">
                      Supervisives Feedback zum aktuellen Raumbild:
                    </p>
                    <p className="text-[12px] text-[#5f5f59] leading-relaxed">
                      {activeScenario === 'conflict'
                        ? 'Auffällig ist die dichte Ballung zwischen Rolle und Leitung, während das Kollegium abgewandt im toten Winkel steht. Das Tuch markiert eine Schutzgrenze, die jedoch den Fluss hemmt.'
                        : activeScenario === 'resource'
                        ? 'Ausgewogenes Dreieck mit freier Sichtachse auf das gemeinsame Ziel. Keine Figur muss den Rücken ungeschützt darbieten. Ressourcen sind beidseitig flankiert.'
                        : 'Die Figuren stehen in offener Erkundung. Beachten Sie, wer wem ins Gesicht blickt und wer isoliert im Raum verweilt.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 02, 03, 04 - Narrative Material Deep-Dives */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-12 border border-[#e5e2de] shadow-sm">
            <div className="lg:col-span-7 space-y-5">
              <span className="font-serif text-2xl italic text-[#5f5f59]">
                {METHODS_DATA[selectedMethodIdx].num}
              </span>
              <h2 className="font-serif text-[28px] md:text-[34px] font-normal text-[#1c1c1a]">
                {METHODS_DATA[selectedMethodIdx].title}
              </h2>
              <p className="font-sans text-[16px] text-[#1c1c1a] leading-relaxed">
                {METHODS_DATA[selectedMethodIdx].longDesc}
              </p>
              <div className="p-4 bg-[#f6f3ef] border-l-2 border-[#13332f] space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#13332f]">
                  Einsatz im Atelier:
                </span>
                <p className="text-[13px] text-[#5f5f59]">
                  {METHODS_DATA[selectedMethodIdx].tools}
                </p>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="font-sans text-[14px] font-medium bg-[#13332f] text-white px-6 py-3 hover:bg-[#2e2f2a] transition-colors"
                >
                  Dieses Setting für eigenen Fall erproben
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-[#f0edea] overflow-hidden border border-[#e5e2de]">
                <img
                  src={IMAGES.materials}
                  alt={METHODS_DATA[selectedMethodIdx].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#fcf9f5]/95 px-3 py-1.5 text-[11px] font-serif italic text-[#1c1c1a]">
                  Werkzeugkoffer Klares Atelier
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#ebe8e4] p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-[#e5e2de]">
          <div>
            <h3 className="font-serif text-[22px] font-normal text-[#1c1c1a]">
              Möchten Sie einen konkreten Fall in dieser Weise betrachten?
            </h3>
            <p className="font-sans text-[14px] text-[#5f5f59] mt-1">
              Im 30-minütigen Kennenlerngespräch prüfen wir unverbindlich, welche Methoden zu Ihrer aktuellen Fragestellung passen.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="font-sans text-[14px] font-medium bg-[#13332f] text-white px-8 py-3.5 hover:bg-[#2e2f2a] transition-colors whitespace-nowrap shadow-sm"
          >
            Erstgespräch anfragen
          </button>
        </div>
      </div>
    </div>
  );
};
