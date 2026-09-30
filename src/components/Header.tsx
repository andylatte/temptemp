import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen, anchorId?: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleNavClick = (screen: ActiveScreen, anchorId?: string) => {
    onNavigate(screen, anchorId);
    setMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f5]/95 backdrop-blur-sm border-b border-[#e5e2de] transition-colors">
      <div className="h-20 w-full px-5 md:px-8 lg:px-16 max-w-[1500px] mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => handleNavClick('overview')}
          className="text-left font-serif text-[22px] md:text-[24px] tracking-tight text-[#1c1c1a] hover:opacity-85 transition-opacity"
        >
          KLARES ATELIER <span className="font-serif italic text-[#5f5f59] font-normal">— Supervision</span>
        </button>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => handleNavClick('overview', 'methoden')}
              className={`text-[14px] tracking-wide transition-colors py-1 ${
                currentScreen === 'methoden' || currentScreen === 'methoden-lab'
                  ? 'text-[#1c1c1a] font-medium border-b border-[#13332f]'
                  : 'text-[#414846] hover:text-[#1c1c1a]'
              }`}
            >
              Methoden
            </button>
            <button
              onClick={() => handleNavClick('overview', 'fuer-wen')}
              className={`text-[14px] tracking-wide transition-colors py-1 ${
                currentScreen === 'fuer-wen'
                  ? 'text-[#1c1c1a] font-medium border-b border-[#13332f]'
                  : 'text-[#414846] hover:text-[#1c1c1a]'
              }`}
            >
              Für wen
            </button>
            <button
              onClick={() => handleNavClick('overview', 'haltung')}
              className={`text-[14px] tracking-wide transition-colors py-1 ${
                currentScreen === 'haltung'
                  ? 'text-[#1c1c1a] font-medium border-b border-[#13332f]'
                  : 'text-[#414846] hover:text-[#1c1c1a]'
              }`}
            >
              Haltung
            </button>
            <button
              onClick={() => handleNavClick('overview', 'ueber-mich')}
              className={`text-[14px] tracking-wide transition-colors py-1 ${
                currentScreen === 'ueber-mich'
                  ? 'text-[#1c1c1a] font-medium border-b border-[#13332f]'
                  : 'text-[#414846] hover:text-[#1c1c1a]'
              }`}
            >
              Über mich
            </button>
            <button
              onClick={() => handleNavClick('overview', 'preise')}
              className={`text-[14px] tracking-wide transition-colors py-1 ${
                currentScreen === 'preise' || currentScreen === 'rechner'
                  ? 'text-[#1c1c1a] font-medium border-b border-[#13332f]'
                  : 'text-[#414846] hover:text-[#1c1c1a]'
              }`}
            >
              Preise
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-block font-sans text-[14px] font-medium bg-[#2b4a45] text-white px-5 md:px-6 py-2.5 md:py-3 transition-colors hover:bg-[#13332f] shadow-sm"
            >
              Erstgespräch anfragen
            </button>

            {/* Profile Avatar / Quick Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-9 h-9 rounded-full bg-[#13332f] flex items-center justify-center text-white hover:bg-[#2b4a45] transition-colors focus:outline-none focus:ring-2 focus:ring-[#13332f]/20"
                title="Atelier Navigation & Bildschirme"
                aria-label="Atelier Navigation"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              {/* Dropdown Menu for Quick View Switch */}
              {profileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#ffffff] border border-[#e5e2de] shadow-lg p-2 z-50 text-[13px]"
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#f0edea]">
                    <p className="font-medium text-[#1c1c1a]">Klares Atelier</p>
                    <p className="text-[12px] text-[#5f5f59]">Bildschirm- & Werkzeugauswahl</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { onNavigate('overview'); setProfileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-[#f6f3ef] text-[#1c1c1a] flex items-center justify-between"
                    >
                      <span>Hauptansicht (Atelier)</span>
                      <span className="text-[11px] text-[#5f5f59]">Standard</span>
                    </button>
                    <button
                      onClick={() => { onNavigate('methoden-lab'); setProfileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-[#f6f3ef] text-[#1c1c1a] flex items-center justify-between"
                    >
                      <span>Methoden-Labor (Aufstellung)</span>
                      <span className="text-[11px] text-[#13332f] font-medium">Interaktiv</span>
                    </button>
                    <button
                      onClick={() => { onNavigate('rechner'); setProfileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-[#f6f3ef] text-[#1c1c1a] flex items-center justify-between"
                    >
                      <span>Honorarrechner</span>
                      <span className="text-[11px] text-[#13332f] font-medium">Rechner</span>
                    </button>
                    <button
                      onClick={() => { onOpenBooking(); setProfileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-[#f6f3ef] text-[#1c1c1a] flex items-center justify-between"
                    >
                      <span>Erstgespräch buchen</span>
                      <span className="text-[11px] text-[#13332f] font-medium">30 Min</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors"
              aria-label="Navigation öffnen"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f5] border-b border-[#e5e2de] px-5 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('overview', 'methoden')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Methoden & Materialien
          </button>
          <button
            onClick={() => handleNavClick('methoden-lab')}
            className="block w-full text-left py-2 text-[14px] text-[#13332f] pl-3 border-l-2 border-[#13332f]"
          >
            → Interaktives Methoden-Labor
          </button>
          <button
            onClick={() => handleNavClick('overview', 'fuer-wen')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Für wen (Formate & Kohorten)
          </button>
          <button
            onClick={() => handleNavClick('overview', 'haltung')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Haltung & Verständnis
          </button>
          <button
            onClick={() => handleNavClick('overview', 'ueber-mich')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Über mich (Elena Vance)
          </button>
          <button
            onClick={() => handleNavClick('overview', 'preise')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Preise & Honorare
          </button>
          <button
            onClick={() => handleNavClick('rechner')}
            className="block w-full text-left py-2 text-[14px] text-[#13332f] pl-3 border-l-2 border-[#13332f]"
          >
            → Honorarrechner öffnen
          </button>
          <button
            onClick={() => handleNavClick('overview', 'kontakt')}
            className="block w-full text-left py-2 text-[15px] text-[#1c1c1a] font-medium hover:text-[#13332f]"
          >
            Kontakt & Anfahrt
          </button>
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full text-center font-sans text-[14px] font-medium bg-[#13332f] text-white py-3"
            >
              Erstgespräch buchen (30 Min frei)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
