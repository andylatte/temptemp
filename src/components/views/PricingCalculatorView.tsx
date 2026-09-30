import React, { useState } from 'react';

interface PricingCalculatorViewProps {
  onBackToOverview: () => void;
  onOpenBookingWithPrefill: (notes: string) => void;
}

export const PricingCalculatorView: React.FC<PricingCalculatorViewProps> = ({
  onBackToOverview,
  onOpenBookingWithPrefill,
}) => {
  const [formatType, setFormatType] = useState<'einzel_self' | 'einzel_org' | 'gruppe' | 'team_short' | 'team_halfday' | 'team_fullday'>('einzel_self');
  const [sessionCount, setSessionCount] = useState<number>(3);
  const [locationType, setLocationType] = useState<'atelier' | 'inhouse_berlin' | 'inhouse_regional'>('atelier');
  const [groupParticipants, setGroupParticipants] = useState<number>(4);

  // Calculate pricing
  let basePriceNettoPerSession = 140;
  let vatApplies = false;
  let formatLabel = 'Einzelsupervision (Selbstzahler:in)';
  let durationDesc = '60 Minuten je Sitzung';

  switch (formatType) {
    case 'einzel_self':
      basePriceNettoPerSession = 140;
      vatApplies = false; // Heilbehandlung/USt-befreit nach § 4 Nr. 14 / Kleinunternehmer / therapeut. Coaching je nach Indikation, oder inkl.
      formatLabel = 'Einzelsupervision (Selbstzahler)';
      durationDesc = '60 Min pro Termin';
      break;
    case 'einzel_org':
      basePriceNettoPerSession = 180;
      vatApplies = true;
      formatLabel = 'Einzelsupervision (Übernahme Träger / Arbeitgeber)';
      durationDesc = '60 Min pro Termin';
      break;
    case 'gruppe':
      basePriceNettoPerSession = 240;
      vatApplies = false;
      formatLabel = 'Fall- & Gruppensupervision';
      durationDesc = '90 Min (3–5 Personen)';
      break;
    case 'team_short':
      basePriceNettoPerSession = 320;
      vatApplies = true;
      formatLabel = 'Teamsupervision Standard';
      durationDesc = '120 Min (inkl. Dokumentation)';
      break;
    case 'team_halfday':
      basePriceNettoPerSession = 750;
      vatApplies = true;
      formatLabel = 'Teamklausur Halbtag';
      durationDesc = '4 Stunden (inkl. Konzept)';
      break;
    case 'team_fullday':
      basePriceNettoPerSession = 1400;
      vatApplies = true;
      formatLabel = 'Teamklausur Ganztag';
      durationDesc = '7 Stunden (inkl. Nachbereitung & Auswertung)';
      break;
  }

  let travelFeePerSession = 0;
  if (locationType === 'inhouse_berlin') {
    travelFeePerSession = 40;
  } else if (locationType === 'inhouse_regional') {
    travelFeePerSession = 90;
  }

  const subtotalNetto = (basePriceNettoPerSession + travelFeePerSession) * sessionCount;
  const vatAmount = vatApplies ? subtotalNetto * 0.19 : 0;
  const totalAmount = subtotalNetto + vatAmount;

  const perParticipantPrice = formatType === 'gruppe' ? totalAmount / (groupParticipants || 1) : null;

  const handleInquire = () => {
    const summary = `${formatLabel} (${sessionCount} Termine à ${durationDesc}), Ort: ${
      locationType === 'atelier' ? 'Atelier Berlin-Prenzlauer Berg' : 'Inhouse vor Ort'
    }, Kalkulation: ${totalAmount.toFixed(0)} €`;
    onOpenBookingWithPrefill(summary);
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
            Bildschirm: Honorarrechner & Kalkulation
          </span>
        </div>

        {/* Headline */}
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-widest text-[#13332f] font-semibold mb-2">
            Transparenz ohne Überraschungen
          </p>
          <h1 className="font-serif text-[34px] md:text-[44px] leading-tight font-normal text-[#1c1c1a]">
            Honorarrechner für Ihre Budget- und Klausurplanung.
          </h1>
          <p className="font-sans text-[16px] text-[#5f5f59] mt-3 leading-relaxed">
            Berechnen Sie transparent die Kosten für Einzelberatungen, Fallgruppen oder mehrtägige Teamentwicklungen. Raum- und Materialkosten im Berliner Atelier sind stets inklusive.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings Left Column */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 border border-[#e5e2de] shadow-sm space-y-8">
            {/* Step 1: Format */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold block mb-3">
                1. Gewünschtes Format auswählen
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setFormatType('einzel_self')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'einzel_self'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Einzelsupervision</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">Selbstzahler:innen (60 Min)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">140 €</p>
                </button>

                <button
                  onClick={() => setFormatType('einzel_org')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'einzel_org'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Einzelsupervision (Org)</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">Führung & Träger (60 Min)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">180 € net</p>
                </button>

                <button
                  onClick={() => setFormatType('gruppe')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'gruppe'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Fall- & Gruppensupervision</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">3–5 Kolleg:innen (90 Min)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">240 € (gesamt)</p>
                </button>

                <button
                  onClick={() => setFormatType('team_short')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'team_short'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Teamsupervision</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">Laufendes Team (120 Min)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">320 € net</p>
                </button>

                <button
                  onClick={() => setFormatType('team_halfday')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'team_halfday'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Halbtagesklausur</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">Intensivworkshop (4 Std.)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">750 € net</p>
                </button>

                <button
                  onClick={() => setFormatType('team_fullday')}
                  className={`text-left p-4 border transition-all ${
                    formatType === 'team_fullday'
                      ? 'border-[#13332f] bg-[#f6f3ef] ring-1 ring-[#13332f]'
                      : 'border-[#e5e2de] hover:bg-[#fcf9f5]'
                  }`}
                >
                  <p className="font-serif text-[17px] text-[#1c1c1a] font-normal">Ganztagesklausur</p>
                  <p className="text-[12px] text-[#5f5f59] mt-1">Großes Team / Change (7 Std.)</p>
                  <p className="font-serif text-[16px] text-[#13332f] mt-2">1.400 € net</p>
                </button>
              </div>
            </div>

            {/* Step 2: Anzahl Einheiten */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                  2. Anzahl der Termine / Einheiten
                </label>
                <span className="font-serif text-[18px] text-[#13332f]">
                  {sessionCount} {sessionCount === 1 ? 'Einheit' : 'Einheiten'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={sessionCount}
                onChange={(e) => setSessionCount(parseInt(e.target.value))}
                className="w-full accent-[#13332f] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#5f5f59] mt-1">
                <span>1 Einzelsitzung</span>
                <span>3–5 Quartalsserie</span>
                <span>10 Jahresbegleitung</span>
              </div>
            </div>

            {/* Optional Group participants split */}
            {formatType === 'gruppe' && (
              <div className="p-4 bg-[#f6f3ef] border border-[#e5e2de]">
                <label className="text-[11px] uppercase tracking-wider text-[#13332f] font-semibold block mb-2">
                  Gruppengröße für Kostenaufteilung
                </label>
                <div className="flex items-center gap-3">
                  {[3, 4, 5].map((count) => (
                    <button
                      key={count}
                      onClick={() => setGroupParticipants(count)}
                      className={`px-4 py-2 text-[13px] border ${
                        groupParticipants === count
                          ? 'bg-[#13332f] text-white border-[#13332f]'
                          : 'bg-white text-[#1c1c1a] border-[#e5e2de]'
                      }`}
                    >
                      {count} Personen
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold block mb-3">
                3. Durchführungsort
              </label>
              <div className="space-y-2">
                <label
                  onClick={() => setLocationType('atelier')}
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer ${
                    locationType === 'atelier' ? 'bg-[#f6f3ef] border-[#13332f]' : 'border-[#e5e2de]'
                  }`}
                >
                  <input
                    type="radio"
                    name="location"
                    checked={locationType === 'atelier'}
                    onChange={() => setLocationType('atelier')}
                    className="mt-1 accent-[#13332f]"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-[#1c1c1a]">Klares Atelier (Berlin-Prenzlauer Berg)</p>
                    <p className="text-[12px] text-[#5f5f59]">
                      Raumnutzung, Arbeitsmaterialien, Tee & Wasser vollumfänglich inklusive (0 € Zusatzkosten)
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setLocationType('inhouse_berlin')}
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer ${
                    locationType === 'inhouse_berlin' ? 'bg-[#f6f3ef] border-[#13332f]' : 'border-[#e5e2de]'
                  }`}
                >
                  <input
                    type="radio"
                    name="location"
                    checked={locationType === 'inhouse_berlin'}
                    onChange={() => setLocationType('inhouse_berlin')}
                    className="mt-1 accent-[#13332f]"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-[#1c1c1a]">Inhouse in Ihren Räumlichkeiten (Berlin)</p>
                    <p className="text-[12px] text-[#5f5f59]">
                      Anreise & mobiler Werkzeugkoffer innerhalb des Berliner Stadtgebiets (+40 € je Termin)
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setLocationType('inhouse_regional')}
                  className={`flex items-start gap-3 p-3.5 border cursor-pointer ${
                    locationType === 'inhouse_regional' ? 'bg-[#f6f3ef] border-[#13332f]' : 'border-[#e5e2de]'
                  }`}
                >
                  <input
                    type="radio"
                    name="location"
                    checked={locationType === 'inhouse_regional'}
                    onChange={() => setLocationType('inhouse_regional')}
                    className="mt-1 accent-[#13332f]"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-[#1c1c1a]">Inhouse Bundesweit / Brandenburg</p>
                    <p className="text-[12px] text-[#5f5f59]">
                      Reisekostenpauschale nach Vereinbarung (+90 € Schätzung)
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Summary Box Right Column */}
          <div className="lg:col-span-5 bg-[#ebe8e4] p-6 md:p-8 border border-[#e5e2de] shadow-sm sticky top-28 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#13332f] font-semibold">
                Kalkulationsübersicht
              </span>
              <h3 className="font-serif text-[24px] text-[#1c1c1a] font-normal mt-1">
                Ihr unverbindlicher Richtpreis
              </h3>
            </div>

            <div className="space-y-3 py-4 border-y border-[#dcdad6] text-[14px]">
              <div className="flex justify-between items-center text-[#5f5f59]">
                <span>Format:</span>
                <span className="text-[#1c1c1a] font-medium text-right max-w-[200px]">{formatLabel}</span>
              </div>
              <div className="flex justify-between items-center text-[#5f5f59]">
                <span>Dauer / Umfang:</span>
                <span className="text-[#1c1c1a] font-medium">{sessionCount} × {durationDesc}</span>
              </div>
              <div className="flex justify-between items-center text-[#5f5f59]">
                <span>Ort:</span>
                <span className="text-[#1c1c1a] font-medium">
                  {locationType === 'atelier' ? 'Atelier Berlin' : 'Inhouse'}
                </span>
              </div>
              {travelFeePerSession > 0 && (
                <div className="flex justify-between items-center text-[#5f5f59]">
                  <span>Fahrtkosten ({sessionCount} × {travelFeePerSession} €):</span>
                  <span className="text-[#1c1c1a] font-medium">{sessionCount * travelFeePerSession} €</span>
                </div>
              )}
              {vatApplies && (
                <div className="flex justify-between items-center text-[#5f5f59]">
                  <span>19% USt.:</span>
                  <span className="text-[#1c1c1a] font-medium">{vatAmount.toFixed(2)} €</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-[#5f5f59] uppercase tracking-wider font-semibold">
                  Gesamtbetrag {vatApplies ? '(brutto)' : ''}:
                </span>
                <span className="font-serif text-[38px] text-[#13332f] font-normal">
                  {totalAmount.toFixed(0)} €
                </span>
              </div>
              {perParticipantPrice !== null && (
                <p className="text-[12px] text-[#13332f] mt-1 text-right">
                  ≈ {perParticipantPrice.toFixed(0)} € pro Person (bei {groupParticipants} Teilnehmenden)
                </p>
              )}
              <p className="text-[11px] text-[#5f5f59] mt-2">
                Inklusive Vorbesprechung, Raum, Material und Protokollnotiz.
              </p>
            </div>

            {/* Inquire CTA */}
            <div className="pt-2">
              <button
                onClick={handleInquire}
                className="w-full text-center font-sans text-[14px] font-medium bg-[#13332f] text-white py-3.5 hover:bg-[#2e2f2a] transition-colors shadow-sm"
              >
                Dieses Angebot unverbindlich anfragen
              </button>
              <p className="text-[11px] text-center text-[#5f5f59] mt-2">
                Keine Zahlungsverpflichtung. Sie erhalten ein individuelles Angebot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
