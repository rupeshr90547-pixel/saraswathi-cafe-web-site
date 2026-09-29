/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Bell, CheckCircle, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const { 
    notification, 
    setNotification, 
    setIsLoyaltyModalOpen,
    isAdmin 
  } = useRestaurant();

  const handleNavigate = (sectionId: string) => {
    if (currentView === 'admin') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2] text-[#232323]">
      
      {/* Real-time Global Notification Toast */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-in slide-in-from-top duration-300 pointer-events-none">
          <div className="bg-[#1B4332] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#D4AF37]/60 flex items-center justify-between gap-3 pointer-events-auto">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 animate-bounce" />
              </span>
              <p className="text-xs font-bold text-emerald-50 leading-snug">
                {notification}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-stone-300 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* View Switcher: Admin Portal or Customer Website */}
      {currentView === 'admin' && isAdmin ? (
        <AdminDashboard onExit={() => setCurrentView('home')} />
      ) : (
        <>
          <Navbar 
            onNavigate={handleNavigate} 
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          <main className="flex-1">
            <Hero 
              onExploreMenu={() => handleNavigate('menu')} 
              onOpenLoyalty={() => setIsLoyaltyModalOpen(true)}
            />
            <MenuSection />
            <AboutSection />
            <HighlightsSection />
            <ReviewsSection />
            <GallerySection />
            <ContactSection />
          </main>

          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <LiveOrderTrackerModal />
      <LoyaltyModal />
      <AdminLoginModal onSuccessfulLogin={() => setCurrentView('admin')} />

    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainAppContent />
    </RestaurantProvider>
  );
}
