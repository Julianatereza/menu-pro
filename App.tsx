
import React, { useState, useEffect } from 'react';
import { MenuData, AppView } from './types';
import { INITIAL_MENU_DATA } from './constants';
import LandingPage from './screens/LandingPage';
import TemplateGallery from './screens/TemplateGallery';
import ItemEditor from './screens/ItemEditor';
import StyleCustomizer from './screens/StyleCustomizer';
import MenuPreview from './screens/MenuPreview';
import Checkout from './screens/Checkout';
import QRCodeGenerator from './screens/QRCodeGenerator';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [menuData, setMenuData] = useState<MenuData>(INITIAL_MENU_DATA);

  useEffect(() => {
    const saved = localStorage.getItem('menu_pro_data');
    if (saved) {
      try { setMenuData(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('menu_pro_data', JSON.stringify(menuData));
  }, [menuData]);

  const navItems = [
    { id: 'templates' as AppView, label: 'Modelos', icon: 'grid_view' },
    { id: 'editor' as AppView, label: 'Editor', icon: 'edit_note' },
    { id: 'design' as AppView, label: 'Design', icon: 'palette' },
    { id: 'qrcode' as AppView, label: 'QR Code', icon: 'qr_code_2' },
    { id: 'preview' as AppView, label: 'Prévia', icon: 'visibility' },
  ];

  const renderView = () => {
    switch (view) {
      case 'landing': return <LandingPage onStart={() => setView('templates')} />;
      case 'templates': return <TemplateGallery onSelectTemplate={() => setView('editor')} />;
      case 'editor': return <ItemEditor menuData={menuData} setMenuData={setMenuData} onExport={() => setView('checkout')} />;
      case 'design': return <StyleCustomizer menuData={menuData} setMenuData={setMenuData} />;
      case 'qrcode': return <QRCodeGenerator onBack={() => setView('editor')} />;
      case 'preview': return <MenuPreview menuData={menuData} onBack={() => setView('editor')} onGoPremium={() => setView('checkout')} />;
      case 'checkout': return <Checkout onBack={() => setView('preview')} onComplete={() => { setMenuData(prev => ({ ...prev, isPremium: true })); setView('preview'); }} />;
      default: return <LandingPage onStart={() => setView('templates')} />;
    }
  };

  const showNav = view !== 'landing' && view !== 'checkout' && view !== 'preview';

  return (
    <div className="min-h-screen bg-[#fcfaf9] dark:bg-[#120c0a] flex flex-col md:flex-row">
      {/* Sidebar - Desktop Only */}
      {showNav && (
        <aside className="hidden md:flex w-64 bg-white dark:bg-[#1a1310] border-r border-gray-200 dark:border-white/10 flex-col fixed inset-y-0 z-50">
          <div className="p-6">
            <div 
              className="flex items-center gap-3 text-primary mb-8 cursor-pointer"
              onClick={() => setView('landing')}
            >
              <span className="material-symbols-outlined text-3xl font-fill">restaurant_menu</span>
              <h1 className="text-xl font-bold tracking-tight dark:text-white">Menu Pro</h1>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    view === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className={`material-symbols-outlined ${view === item.id ? 'font-fill' : ''}`}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-6">
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Versão Pro</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Desbloqueie todos os recursos.</p>
              <button onClick={() => setView('checkout')} className="w-full bg-primary text-white py-2 rounded-lg text-xs font-bold">Upgrade</button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${showNav ? 'md:ml-64' : ''}`}>
        <div className={view === 'landing' ? 'w-full min-h-screen' : 'max-w-6xl mx-auto min-h-screen'}>
          {renderView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {showNav && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1a1310]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10 pb-6 pt-2 px-6 flex justify-between items-center z-50">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1 ${view === item.id ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className={`material-symbols-outlined text-[26px] ${view === item.id ? 'font-fill' : ''}`}>{item.icon}</span>
              <p className="text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default App;
