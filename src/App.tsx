import { useState, useEffect } from 'react';
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
import { ProfilePage } from './pages/ProfilePage';
import { Question } from './types';
import { mockQuestions } from './data/mockQuestions';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const { isLoading, isAuthenticated, user } = useAuth();

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFABClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setIsAskModalOpen(true);
    }
  };

  const handleAskQuestion = (questionText: string, category: string, hashtags: string[], country: string) => {
    if (!isAuthenticated || !user) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      category,
      hashtags,
      country,
      yesVotes: 0,
      noVotes: 0,
      totalVotes: 0,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date(),
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setIsAskModalOpen(false);
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
        onSubmit={handleAskQuestion}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {showBackToTop && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    style={{
      position: 'fixed',
      bottom: 90,
      right: 23,
      width: 58,
      height: 58,
      background: '#2563eb',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '50%',
      border: 'none',
      fontSize: 28,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s ease',
    }} >
    <span aria-label="Back to top">
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </span>
  </button>
)}
    </div>
  );
}

export default App;