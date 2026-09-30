import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainOverviewView } from './components/views/MainOverviewView';
import { MethodLabView } from './components/views/MethodLabView';
import { PricingCalculatorView } from './components/views/PricingCalculatorView';
import { CohortsView } from './components/views/CohortsView';
import { BookingModal } from './components/modals/BookingModal';
import { LegalModal } from './components/modals/LegalModal';
import { ActiveScreen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefillFormat, setBookingPrefillFormat] = useState<string>('einzel');
  const [bookingPrefillNotes, setBookingPrefillNotes] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNavigate = (screen: ActiveScreen, anchorId?: string) => {
    setCurrentScreen(screen);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleOpenBooking = (format: string = 'einzel', notes: string = '') => {
    setBookingPrefillFormat(format);
    setBookingPrefillNotes(notes);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f5] font-sans text-[#1c1c1a] antialiased">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking('einzel')}
      />

      {/* Screen Switcher Bar (Discreet, provides clear visual affordance to all requested screens) */}
      <div className="pt-20 bg-[#f6f3ef] border-b border-[#e5e2de] px-5 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto py-2.5 flex items-center justify-between overflow-x-auto text-[13px] no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-[#5f5f59] font-medium mr-2 hidden sm:inline">
              Bildschirm-Ansicht:
            </span>
            <button
              onClick={() => setCurrentScreen('overview')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                currentScreen === 'overview'
                  ? 'bg-[#13332f] text-white shadow-xs'
                  : 'text-[#5f5f59] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]'
              }`}
            >
              Atelier-Hauptseite
            </button>
            <button
              onClick={() => setCurrentScreen('methoden-lab')}
              className={`px-3 py-1.5 transition-colors font-medium flex items-center gap-1.5 ${
                currentScreen === 'methoden-lab'
                  ? 'bg-[#13332f] text-white shadow-xs'
                  : 'text-[#5f5f59] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]'
              }`}
            >
              <span>Methoden-Labor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>
            <button
              onClick={() => setCurrentScreen('fuer-wen')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                currentScreen === 'fuer-wen'
                  ? 'bg-[#13332f] text-white shadow-xs'
                  : 'text-[#5f5f59] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]'
              }`}
            >
              Kohorten & Plätze
            </button>
            <button
              onClick={() => setCurrentScreen('rechner')}
              className={`px-3 py-1.5 transition-colors font-medium ${
                currentScreen === 'rechner'
                  ? 'bg-[#13332f] text-white shadow-xs'
                  : 'text-[#5f5f59] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]'
              }`}
            >
              Honorarrechner
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[12px] text-[#5f5f59]">
            <span>DGSv i.A. zertifiziert</span>
            <span>·</span>
            <span>Berlin-Prenzlauer Berg</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-[#fcf9f5]">
        {currentScreen === 'overview' && (
          <MainOverviewView
            onNavigateToScreen={(screen) => setCurrentScreen(screen)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentScreen === 'methoden-lab' && (
          <MethodLabView
            onBackToOverview={() => setCurrentScreen('overview')}
            onOpenBooking={() => handleOpenBooking('methoden')}
          />
        )}

        {currentScreen === 'fuer-wen' && (
          <CohortsView
            onBackToOverview={() => setCurrentScreen('overview')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentScreen === 'rechner' && (
          <PricingCalculatorView
            onBackToOverview={() => setCurrentScreen('overview')}
            onOpenBookingWithPrefill={(notes) => handleOpenBooking('kalkulation', notes)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onScrollToContact={() => handleNavigate('overview', 'kontakt')}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialFormat={bookingPrefillFormat}
        initialNotes={bookingPrefillNotes}
      />

      {/* Impressum & Datenschutz Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
