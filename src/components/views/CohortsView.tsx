import React, { useState } from 'react';
import { UPCOMING_COHORTS, FORMATS_DATA } from '../../data/content';

interface CohortsViewProps {
  onBackToOverview: () => void;
  onOpenBooking: (format?: string) => void;
}

export const CohortsView: React.FC<CohortsViewProps> = ({ onBackToOverview, onOpenBooking }) => {
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null);
  const [reservationName, setReservationName] = useState('');
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSubmitted(true);
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
            Bildschirm: Formate & Laufende Kohorten
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-widest text-[#13332f] font-semibold mb-2">
            02 / FÜR WEN & GRUPPENANGEBOTE
          </p>
          <h1 className="font-serif text-[34px] md:text-[44px] leading-tight font-normal text-[#1c1c1a]">
            Feste Kohorten & Kollegiale Fallsupervision.
          </h1>
          <p className="font-sans text-[16px] text-[#5f5f59] mt-3 leading-relaxed">
            In kleinen, vertraulichen Gruppen von maximal 5 bis 6 Fachkräften bearbeiten wir reale Praxisfälle mit interdisziplinärem Resonanzraum. Durch feste Gruppen bleibt der Schutzraum gewahrt.
          </p>
        </div>

        {/* Cohort Schedule Cards */}
        <div className="space-y-6 mb-16">
          <h2 className="font-serif text-[24px] text-[#1c1c1a] font-normal">
            Aktuelle Kohorten mit freien Plätzen (2026 / 2027)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_COHORTS.map((cohort) => (
              <div
                key={cohort.id}
                className="bg-white p-6 md:p-8 border border-[#e5e2de] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                      Kohorte {cohort.id.split('-')[1]}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-medium ${
                        cohort.status === 'few_seats'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {cohort.freeSeats} von {cohort.totalSeats} Plätzen frei
                    </span>
                  </div>

                  <h3 className="font-serif text-[20px] text-[#1c1c1a] font-normal leading-snug mb-2">
                    {cohort.title}
                  </h3>
                  <p className="font-sans text-[13px] text-[#5f5f59] mb-4">{cohort.focus}</p>

                  <div className="bg-[#f6f3ef] p-3 text-[12px] space-y-1 mb-4 border border-[#e5e2de]/60">
                    <p className="font-medium text-[#1c1c1a]">{cohort.rhythm}</p>
                    <p className="text-[#5f5f59]">
                      Termine: {cohort.dates.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f0edea]">
                  <button
                    onClick={() => {
                      setSelectedCohort(cohort.id);
                      setReservationSubmitted(false);
                    }}
                    className="w-full text-center font-sans text-[13px] font-medium bg-[#ebe8e4] text-[#1c1c1a] py-2.5 hover:bg-[#13332f] hover:text-white transition-colors"
                  >
                    Platz anfragen / Kennenlernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Cohort Reservation Modal / Form */}
        {selectedCohort && (
          <div className="bg-white p-6 md:p-10 border border-[#13332f] shadow-md mb-16 max-w-2xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                  Platz-Reservierung
                </span>
                <h3 className="font-serif text-[22px] text-[#1c1c1a] font-normal mt-0.5">
                  Interesse für Kohorte anmelden
                </h3>
              </div>
              <button
                onClick={() => setSelectedCohort(null)}
                className="text-[#5f5f59] hover:text-[#1c1c1a]"
              >
                ✕
              </button>
            </div>

            {reservationSubmitted ? (
              <div className="p-4 bg-[#13332f] text-white text-[14px]">
                <p className="font-medium">Vielen Dank für Ihre Vormerkung!</p>
                <p className="text-[13px] text-white/90 mt-1">
                  Elena Vance wird sich kurzfristig bei Ihnen melden, um vorab in einem kurzen Telefonat zu prüfen, ob die Gruppenzusammensetzung für Ihr Anliegen stimmig ist.
                </p>
                <button
                  onClick={() => setSelectedCohort(null)}
                  className="mt-4 px-4 py-2 bg-white text-[#13332f] text-[13px] font-medium"
                >
                  Schließen
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <p className="text-[13px] text-[#5f5f59]">
                  Vor Aufnahme in eine feste Gruppe führen wir immer ein 15-minütiges telefonisches Vorgespräch, um Rollenkonflikte (z.B. direkte Hierarchien im selben Träger) auszuschließen.
                </p>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    Ihr Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reservationName}
                    onChange={(e) => setReservationName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium block mb-1">
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    required
                    value={reservationEmail}
                    onChange={(e) => setReservationEmail(e.target.value)}
                    placeholder="name@institution.de"
                    className="w-full bg-[#fcf9f5] px-4 py-2.5 text-[14px] border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#13332f]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCohort(null)}
                    className="px-4 py-2.5 text-[13px] text-[#5f5f59] hover:text-[#1c1c1a]"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#13332f] text-white text-[13px] font-medium hover:bg-[#2e2f2a]"
                  >
                    Verbindliches Vorgespräch vereinbaren
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Comparison Table for All 3 Formats */}
        <div className="bg-white p-6 md:p-10 border border-[#e5e2de] shadow-sm">
          <h2 className="font-serif text-[24px] text-[#1c1c1a] font-normal mb-6">
            Formatvergleich auf einen Blick
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse">
              <thead>
                <tr className="border-b border-[#e5e2de] text-[12px] uppercase text-[#5f5f59]">
                  <th className="py-3 pr-4 font-semibold">Format</th>
                  <th className="py-3 px-4 font-semibold">Teilnehmende</th>
                  <th className="py-3 px-4 font-semibold">Dauer</th>
                  <th className="py-3 px-4 font-semibold">Schwerpunkt</th>
                  <th className="py-3 pl-4 font-semibold">Honorar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0edea]">
                <tr>
                  <td className="py-4 pr-4 font-medium text-[#1c1c1a]">Einzelsupervision</td>
                  <td className="py-4 px-4 text-[#5f5f59]">1 Person</td>
                  <td className="py-4 px-4 text-[#5f5f59]">60 Minuten</td>
                  <td className="py-4 px-4 text-[#5f5f59]">Persönliche Rollenklärung, akute Belastung, Fallreflexion</td>
                  <td className="py-4 pl-4 text-[#13332f] font-medium">140 € / 180 €</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-[#1c1c1a]">Kleingruppen-Supervision</td>
                  <td className="py-4 px-4 text-[#5f5f59]">3–6 Fachkräfte</td>
                  <td className="py-4 px-4 text-[#5f5f59]">90 Minuten</td>
                  <td className="py-4 px-4 text-[#5f5f59]">Kollegialer Fallspiegel, Methodenaneignung, gegenseitiges Bezeugen</td>
                  <td className="py-4 pl-4 text-[#13332f] font-medium">240 € (gesamt)</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-[#1c1c1a]">Teamsupervision</td>
                  <td className="py-4 px-4 text-[#5f5f59]">Ganzes Team / Abteilung</td>
                  <td className="py-4 px-4 text-[#5f5f59]">120–180 Min oder Tage</td>
                  <td className="py-4 px-4 text-[#5f5f59]">Schnittstellenkonflikte, Teamentwicklung, Leitungskultur, Klausuren</td>
                  <td className="py-4 pl-4 text-[#13332f] font-medium">ab 320 € net</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
