
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
          Painel do Dono
        </button>
        <div className="flex items-center gap-4">
          {!menuData.isPremium && (
            <button onClick={onGoPremium} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined font-fill">workspace_premium</span>
              Remover Marca d'Água
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-4 md:p-12 flex justify-center overflow-y-auto">
        <div 
          className="relative w-full max-w-[800px] min-h-[1100px] bg-white shadow-2xl p-6 md:p-16 flex flex-col"
          style={{ fontFamily: menuData.config.bodyFont }}
        >
          {!menuData.isPremium && (
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-wrap content-center justify-center opacity-[0.03] rotate-[-30deg] scale-150 overflow-hidden select-none">
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="text-4xl font-black uppercase tracking-[1em] whitespace-nowrap m-12">MENU PRO</div>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center mb-16">
            <h1 
              style={{ fontFamily: menuData.config.titleFont, color: menuData.config.primaryColor, fontSize: `${menuData.config.fontSize * 2.5}px` }} 
              className="font-bold mb-2 text-center"
            >
              {menuData.config.restaurantName}
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold text-center">{menuData.config.subtitle}</p>
          </div>

          <div className="space-y-16">
            {menuData.categories.map(cat => (
              <div key={cat.id} className="space-y-8">
                <h3 style={{ fontFamily: menuData.config.titleFont }} className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-2">{cat.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {cat.items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      {item.imageUrl && (
                        <div className="size-20 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                           <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 group">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide">{item.name || 'Prato Sugerido'}</h4>
                          <span style={{ color: menuData.config.primaryColor }} className="font-bold text-sm whitespace-nowrap">{item.price}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed italic">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-auto pt-16 flex flex-col items-center gap-6">
             <div className="flex items-center gap-8 text-gray-300">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
                <span className="material-symbols-outlined text-2xl">local_cafe</span>
                <span className="material-symbols-outlined text-2xl">wine_bar</span>
             </div>
             <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.3em]">Gerado por Menu Pro</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MenuPreview;
