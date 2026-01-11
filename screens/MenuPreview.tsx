
import React from 'react';
import { MenuData } from '../types';

interface Props {
  menuData: MenuData;
  onBack: () => void;
  onGoPremium: () => void;
}

const MenuPreview: React.FC<Props> = ({ menuData, onBack, onGoPremium }) => {
  return (
    <div className="min-h-screen w-full bg-[#f0edea] dark:bg-[#120c0a] flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a1310]/80 backdrop-blur-md px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          Voltar ao Editor
        </button>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold">
            <span className="material-symbols-outlined">share</span>
            Compartilhar
          </button>
          {!menuData.isPremium && (
            <button onClick={onGoPremium} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined font-fill">workspace_premium</span>
              Remover Marca d'Água
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 flex justify-center overflow-y-auto">
        <div 
          className="relative w-full max-w-[800px] min-h-[1100px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-12 md:p-24 flex flex-col"
          style={{ fontFamily: menuData.config.bodyFont }}
        >
          {/* Watermark Layer */}
          {!menuData.isPremium && (
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-wrap content-center justify-center opacity-[0.03] rotate-[-30deg] scale-150 overflow-hidden select-none">
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="text-4xl font-black uppercase tracking-[1em] whitespace-nowrap m-12">DRAFT PRO</div>
              ))}
            </div>
          )}

          {/* Menu Design */}
          <div className="flex flex-col items-center mb-16">
            <h1 
              style={{ fontFamily: menuData.config.titleFont, color: menuData.config.primaryColor, fontSize: `${menuData.config.fontSize * 2.5}px` }} 
              className="font-bold mb-2 text-center"
            >
              {menuData.config.restaurantName}
            </h1>
            <div className="h-0.5 w-24 bg-gray-100 mb-4" />
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 font-bold text-center">{menuData.config.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {menuData.categories.map(cat => (
              <div key={cat.id} className="space-y-6">
                <h3 style={{ fontFamily: menuData.config.titleFont }} className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">{cat.name}</h3>
                <div className="space-y-6">
                  {cat.items.map(item => (
                    <div key={item.id} className="group">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-bold text-sm text-gray-900">{item.name || 'Prato Sugerido'}</h4>
                        <div className="flex-1 border-b border-dotted border-gray-200 mb-1" />
                        <span style={{ color: menuData.config.primaryColor }} className="font-bold text-sm">{item.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed italic">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-auto pt-16 flex flex-col items-center gap-6">
             <div className="w-16 h-0.5 bg-gray-100" />
             <div className="flex items-center gap-12 text-gray-400">
                <span className="material-symbols-outlined text-3xl">restaurant</span>
                <span className="material-symbols-outlined text-3xl">wine_bar</span>
                <span className="material-symbols-outlined text-3xl">bakery_dining</span>
             </div>
             <p className="text-[10px] text-gray-300 font-medium">MENU PRO - DESIGN DIGITAL PROFISSIONAL</p>
          </footer>
        </div>
      </main>

      {/* Footer Helper Mobile Only */}
      <div className="md:hidden p-6 bg-white border-t border-gray-100">
         <button onClick={onGoPremium} className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl">Salvar e Exportar PDF</button>
      </div>
    </div>
  );
};

export default MenuPreview;
