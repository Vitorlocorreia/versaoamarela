import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileDrawer from './components/MobileDrawer';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import OfferingsSection from './components/OfferingsSection';
import WhyTrainSection from './components/WhyTrainSection';
import HowItWorks from './components/HowItWorks';
import ProductsShowcase from './components/ProductsShowcase';
import ProofGallery from './components/ProofGallery';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import StickyMobileBar from './components/StickyMobileBar';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const whatsappNumber = "5581986833360";
  const whatsappMessage = encodeURIComponent("Olá Arielle! Gostaria de agendar minha consulta inicial e saber mais sobre seus acompanhamentos.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6E4] text-[#1C1400] selection:bg-[#D97706] selection:text-white pb-16 md:pb-0 overflow-x-hidden w-full">
      {/* Navbar */}
      <Navbar 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        whatsappUrl={whatsappUrl}
      />

      {/* Mobile Sidebar Navigation */}
      <MobileDrawer 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenModal={() => setIsBookingModalOpen(true)}
        whatsappUrl={whatsappUrl}
      />

      {/* Main Page Sections — Estrutura original com a nova copy encaixada */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <Hero 
          onOpenModal={() => setIsBookingModalOpen(true)}
          whatsappUrl={whatsappUrl}
        />

        {/* Floating Stats Credibility Bar */}
        <StatsBar />

        {/* Section 2: Quem é Arielle Martins */}
        <AboutSection 
          onOpenModal={() => setIsBookingModalOpen(true)}
        />

        {/* Section 3: Escolha como posso te ajudar */}
        <OfferingsSection 
          onOpenModal={() => setIsBookingModalOpen(true)}
        />

        {/* Section 4: Por que treinar comigo? */}
        <WhyTrainSection />

        {/* Section 5: Como funciona */}
        <HowItWorks />

        {/* Section 6: Conheça o e-book oficial */}
        <ProductsShowcase 
          onOpenModal={() => setIsBookingModalOpen(true)}
          whatsappUrl={whatsappUrl}
        />

        {/* Section 7: Prova Real — galeria de fotos de autonomia funcional */}
        <ProofGallery />

        {/* Section 8: Perguntas Frequentes & Banner WhatsApp */}
        <FAQSection 
          onOpenModal={() => setIsBookingModalOpen(true)}
          whatsappUrl={whatsappUrl}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Form Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappUrl={whatsappUrl} />

      {/* Sticky Mobile CTA Bottom Bar */}
      <StickyMobileBar 
        onOpenModal={() => setIsBookingModalOpen(true)}
        whatsappUrl={whatsappUrl}
      />
    </div>
  );
}
