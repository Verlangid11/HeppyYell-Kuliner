
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import WhyUsSection from './components/WhyUsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import LoginForm from './components/LoginForm';
import GeminiSection from './components/GeminiSection';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <AppProvider>
      <div className="font-sans text-gray-800 dark:text-gray-200">
        <Navbar onLoginClick={() => setLoginModalOpen(true)} onAdminClick={() => setAdminModalOpen(true)} />
        <main>
          <HeroSection />
          <MenuSection />
          <WhyUsSection />
          <GeminiSection />
          <CtaSection />
        </main>
        <Footer />
        <LoginForm isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={() => setAdminModalOpen(true)}/>
        <AdminModal isOpen={isAdminModalOpen} onClose={() => setAdminModalOpen(false)} />
      </div>
    </AppProvider>
  );
}

export default App;
