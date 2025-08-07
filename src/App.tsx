import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { QuestionFeed } from './components/QuestionFeed';
import { LoginModal } from './components/LoginModal';
import { AskQuestionModal } from './components/AskQuestionModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { MobileMenu } from './components/MobileMenu';
import { Footer } from './components/Footer';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CommunityGuidelinesPage } from './pages/CommunityGuidelinesPage';
import { ContactSupportPage } from './pages/ContactSupportPage';
import { useAuth } from './hooks/useAuth';
import {ProfilePage} from './pages/ProfilePage';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, isAuthenticated } = useAuth();

  const handleFABClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setIsAskModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              onLoginClick={() => setIsLoginModalOpen(true)}
              onMenuClick={() => setIsMobileMenuOpen(true)}
            />
            <HomePage 
              onLoginClick={() => setIsLoginModalOpen(true)}
            />
            <FloatingActionButton
              onClick={handleFABClick}
            />
            <Footer />
          </>
        } />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
        <Route path="/contact-support" element={<ContactSupportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}

export default App;