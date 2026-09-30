import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'impressum' | 'datenschutz') => void;
  onScrollToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onScrollToContact }) => {
  return (
    <footer className="w-full bg-[#fcf9f5] border-t border-[#e5e2de] py-12 md:py-16">
      <div className="w-full px-5 md:px-8 lg:px-16 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <p className="font-serif text-[20px] md:text-[22px] text-[#1c1c1a] font-normal tracking-tight">
            KLARES ATELIER
          </p>
          <p className="font-sans text-[13px] text-[#5f5f59]">
            Raum für systemische Reflexion, somatische Erkundung & szenische Prozessbegleitung.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <button
            onClick={onScrollToContact}
            className="font-sans text-[12px] md:text-[13px] text-[#5f5f59] hover:text-[#1c1c1a] transition-colors"
          >
            Kontakt
          </button>
          <button
            onClick={() => onOpenLegal('impressum')}
            className="font-sans text-[12px] md:text-[13px] text-[#5f5f59] hover:text-[#1c1c1a] transition-colors"
          >
            Impressum
          </button>
          <button
            onClick={() => onOpenLegal('datenschutz')}
            className="font-sans text-[12px] md:text-[13px] text-[#5f5f59] hover:text-[#1c1c1a] transition-colors"
          >
            Datenschutz
          </button>
        </div>
      </div>
    </footer>
  );
};
