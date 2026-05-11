import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { UploadPage } from './components/UploadPage';
import { PaperDetail } from './components/PaperDetail';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'paper' | 'profile'>('dashboard');
  const [currentPaperId, setCurrentPaperId] = useState<string | null>(null);

  const handleNavigate = (view: string, paperId?: string) => {
    setCurrentView(view as any);
    if (paperId) {
      setCurrentPaperId(paperId);
    }
  };

  return (
    <div className="size-full">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />

      {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentView === 'upload' && <UploadPage onNavigate={handleNavigate} />}
      {currentView === 'paper' && currentPaperId && <PaperDetail paperId={currentPaperId} />}
      {currentView === 'profile' && <ProfilePage />}
    </div>
  );
}