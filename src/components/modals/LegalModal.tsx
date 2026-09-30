import React from 'react';

interface LegalModalProps {
  type: 'impressum' | 'datenschutz' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl border border-[#e5e2de] shadow-xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#f6f3ef] px-6 py-4 border-b border-[#e5e2de] flex items-center justify-between">
          <h3 className="font-serif text-[20px] text-[#1c1c1a] font-normal">
            {type === 'impressum' ? 'Impressum' : 'Datenschutzerklärung nach DSGVO'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f5f59] hover:bg-[#ebe8e4]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto text-[14px] text-[#1c1c1a] leading-relaxed space-y-4 font-sans">
          {type === 'impressum' ? (
            <>
              <div>
                <p className="font-semibold">Angaben gemäß § 5 TMG</p>
                <p className="mt-1">
                  Klares Atelier — Supervision & Theatrale Prozessbegleitung<br />
                  Elena Vance (Dipl.-Kulturpädagogin, Theatertherapeutin BCTC/DGfT)<br />
                  Lindenallee 42, Atelierhaus Hof 3<br />
                  10405 Berlin
                </p>
              </div>

              <div>
                <p className="font-semibold">Kontakt</p>
                <p className="mt-1">
                  Telefon: +49 (0) 30 48492010<br />
                  E-Mail: kontakt@klares-atelier.de<br />
                  Webseite: www.klares-atelier.de
                </p>
              </div>

              <div>
                <p className="font-semibold">Berufsbezeichnung & berufsrechtliche Regelungen</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Berufsbezeichnung: Supervisorin & Coach (DGSv i.A.), Theatertherapeutin (DGfT). Verliehen in der Bundesrepublik Deutschland.<br />
                  Es gelten die ethischen Richtlinien und Qualitätsstandards der Deutschen Gesellschaft für Supervision und Coaching (DGSv) sowie der Deutschen Gesellschaft für Theatertherapie (DGfT).
                </p>
              </div>

              <div>
                <p className="font-semibold">Umsatzsteuer-Identifikationsnummer</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  USt-IdNr. gemäß § 27 a Umsatzsteuergesetz: DE 318 492 811
                </p>
              </div>

              <div>
                <p className="font-semibold">Berufshaftpflichtversicherung</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Continentale Sachversicherung AG, Ruhrallee 92, 44139 Dortmund.<br />
                  Geltungsbereich: Bundesrepublik Deutschland & EU-Mitgliedsstaaten.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-semibold">1. Datenschutz auf einen Blick</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Als Supervisorin unterliege ich strengster beruflicher Vertraulichkeit. Personenbezogene Daten, die Sie über diese Webseite (z.B. per Kontaktformular oder Terminbuchung) übermitteln, werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Durchführung des Orientierungsgesprächs verarbeitet.
                </p>
              </div>

              <div>
                <p className="font-semibold">2. Verantwortliche Stelle</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Elena Vance, Lindenallee 42, 10405 Berlin, E-Mail: kontakt@klares-atelier.de
                </p>
              </div>

              <div>
                <p className="font-semibold">3. Datenerfassung & Zweck</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Es erfolgt zu keinem Zeitpunkt eine Weitergabe Ihrer Daten an werbliche Dritte oder Tracking-Netzwerke.
                </p>
              </div>

              <div>
                <p className="font-semibold">4. Ihre Rechte</p>
                <p className="mt-1 text-[13px] text-[#5f5f59]">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f6f3ef] px-6 py-3 border-t border-[#e5e2de] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#13332f] text-white text-[13px] font-medium hover:bg-[#2e2f2a]"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
