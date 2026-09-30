import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormat?: string;
  initialNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialFormat = 'einzel',
  initialNotes = '',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-06');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30');
  const [mode, setMode] = useState<'video' | 'phone' | 'atelier'>('video');
  const [format, setFormat] = useState<string>(initialFormat);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [topic, setTopic] = useState<string>(initialNotes);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const availableDates = [
    { dateStr: '2026-10-06', label: 'Di, 06. Oktober 2026' },
    { dateStr: '2026-10-08', label: 'Do, 08. Oktober 2026' },
    { dateStr: '2026-10-12', label: 'Mo, 12. Oktober 2026' },
    { dateStr: '2026-10-14', label: 'Mi, 14. Oktober 2026' },
    { dateStr: '2026-10-16', label: 'Fr, 16. Oktober 2026' },
  ];

  const slots = ['09:30', '10:30', '14:00', '15:30', '17:00'];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Klares Atelier//Supervision//DE',
      'BEGIN:VEVENT',
      `SUMMARY:Orientierungsgespräch - Klares Atelier (Elena Vance)`,
      `DESCRIPTION:Unverbindliches 30-minütiges Orientierungsgespräch mit Elena Vance.\\nModus: ${mode}\\nThema: ${topic || 'Supervision & Prozessbegleitung'}`,
      `LOCATION:${mode === 'atelier' ? 'Lindenallee 42, 10405 Berlin' : 'Video/Telefon'}`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T${selectedSlot.replace(':', '')}00Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T${(parseInt(selectedSlot.split(':')[0]) + 1).toString().padStart(2, '0')}${selectedSlot.split(':')[1]}00Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Orientierungsgespraech_Klares_Atelier_${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl border border-[#e5e2de] shadow-xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-[#f6f3ef] px-6 py-5 border-b border-[#e5e2de] flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
              Klares Atelier — Terminvereinbarung
            </span>
            <h3 className="font-serif text-[22px] text-[#1c1c1a] font-normal mt-0.5">
              Unverbindliches Orientierungsgespräch (30 Min)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5f59] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="grid grid-cols-3 text-center border-b border-[#f0edea] text-[12px]">
          <div
            className={`py-2.5 font-medium border-b-2 ${
              step >= 1 ? 'border-[#13332f] text-[#13332f]' : 'border-transparent text-[#5f5f59]'
            }`}
          >
            1. Termin & Modus
          </div>
          <div
            className={`py-2.5 font-medium border-b-2 ${
              step >= 2 ? 'border-[#13332f] text-[#13332f]' : 'border-transparent text-[#5f5f59]'
            }`}
          >
            2. Kontaktdaten
          </div>
          <div
            className={`py-2.5 font-medium border-b-2 ${
              step === 3 ? 'border-[#13332f] text-[#13332f]' : 'border-transparent text-[#5f5f59]'
            }`}
          >
            3. Bestätigung
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              {/* Setting Mode */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-2">
                  Wie möchten Sie sprechen?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('video')}
                    className={`p-3 text-[13px] border text-left flex items-center gap-2 ${
                      mode === 'video'
                        ? 'border-[#13332f] bg-[#f6f3ef] font-medium text-[#13332f]'
                        : 'border-[#e5e2de] text-[#1c1c1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span>Video-Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('phone')}
                    className={`p-3 text-[13px] border text-left flex items-center gap-2 ${
                      mode === 'phone'
                        ? 'border-[#13332f] bg-[#f6f3ef] font-medium text-[#13332f]'
                        : 'border-[#e5e2de] text-[#1c1c1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>Telefon</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('atelier')}
                    className={`p-3 text-[13px] border text-left flex items-center gap-2 ${
                      mode === 'atelier'
                        ? 'border-[#13332f] bg-[#f6f3ef] font-medium text-[#13332f]'
                        : 'border-[#e5e2de] text-[#1c1c1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                    <span>Im Atelier</span>
                  </button>
                </div>
              </div>

              {/* Day selection */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-2">
                  Wählen Sie einen Tag:
                </label>
                <div className="space-y-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`w-full text-left px-4 py-2.5 text-[14px] border flex items-center justify-between ${
                        selectedDate === d.dateStr
                          ? 'border-[#13332f] bg-[#f6f3ef] font-medium text-[#13332f]'
                          : 'border-[#e5e2de] text-[#1c1c1a] hover:bg-[#fcf9f5]'
                      }`}
                    >
                      <span>{d.label}</span>
                      {selectedDate === d.dateStr && (
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-2">
                  Freie Uhrzeiten:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-[13px] border text-center ${
                        selectedSlot === slot
                          ? 'bg-[#13332f] text-white border-[#13332f] font-medium'
                          : 'bg-white border-[#e5e2de] text-[#1c1c1a] hover:bg-[#ebe8e4]'
                      }`}
                    >
                      {slot} Uhr
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#13332f] text-white text-[14px] font-medium hover:bg-[#2e2f2a] transition-colors"
                >
                  Weiter zu Ihren Daten →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="p-3 bg-[#f6f3ef] border border-[#e5e2de] text-[13px] flex items-center justify-between">
                <span>
                  Gewählt: <strong>{selectedDate} um {selectedSlot} Uhr</strong> ({mode})
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#13332f] underline text-[12px]"
                >
                  Ändern
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@mail.de"
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 ..."
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    Format-Interesse
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  >
                    <option value="einzel">Einzelsupervision</option>
                    <option value="gruppe">Kleingruppen-Supervision</option>
                    <option value="team">Teamsupervision</option>
                    <option value="beratung">Unentschieden / Beratung</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                  Kurze Notiz zu Ihrem Thema (optional)
                </label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Welche Fragestellung führt Sie ins Atelier?"
                  className="w-full bg-[#fcf9f5] px-4 py-2 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-[13px] text-[#5f5f59] hover:text-[#1c1c1a]"
                >
                  ← Zurück
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#13332f] text-white text-[14px] font-medium hover:bg-[#2e2f2a] transition-colors"
                >
                  Gespräch verbindlich reservieren
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">event_available</span>
              </div>
              <div>
                <h4 className="font-serif text-[24px] text-[#1c1c1a] font-normal">
                  Ihr Orientierungsgespräch ist vorgemerkt!
                </h4>
                <p className="font-sans text-[14px] text-[#5f5f59] mt-2 max-w-md mx-auto">
                  Vielen Dank, {name || 'Herr/Frau Interessent:in'}. Elena Vance hat Ihren Termin am{' '}
                  <strong>{selectedDate} um {selectedSlot} Uhr</strong> ({mode}) notiert. Sie erhalten umgehend eine Bestätigung an <strong>{email}</strong>.
                </p>
              </div>

              <div className="bg-[#f6f3ef] p-4 border border-[#e5e2de] max-w-md mx-auto text-left text-[13px] space-y-1">
                <p className="font-medium text-[#1c1c1a]">Ihre Termindetails:</p>
                <p className="text-[#5f5f59]">Datum: {selectedDate}, {selectedSlot} Uhr</p>
                <p className="text-[#5f5f59]">
                  Modus: {mode === 'atelier' ? 'Im Atelier (Lindenallee 42, 10405 Berlin)' : mode === 'video' ? 'Video-Link wird per E-Mail gesendet' : 'Telefonanruf durch Elena Vance'}
                </p>
                <p className="text-[#5f5f59]">Kosten: 0,00 € (vollständig kostenfrei & unverbindlich)</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="px-5 py-2.5 border border-[#13332f] text-[#13332f] text-[13px] font-medium hover:bg-[#f6f3ef] flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>{downloadSuccess ? 'Kalendereintrag geladen' : 'In Kalender eintragen (.ics)'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#13332f] text-white text-[13px] font-medium hover:bg-[#2e2f2a]"
                >
                  Fertigstellen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
