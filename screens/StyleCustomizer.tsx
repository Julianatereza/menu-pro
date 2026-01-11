
import React from 'react';
import { MenuData } from '../types';

interface Props {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
}

const StyleCustomizer: React.FC<Props> = ({ menuData, setMenuData }) => {
  const updateConfig = (field: string, value: any) => {
    setMenuData(prev => ({ ...prev, config: { ...prev.config, [field]: value } }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      {/* Sidebar de Configurações */}
      <div className="w-full lg:w-[400px] lg:border-r border-gray-200 dark:border-white/10 p-6 lg:h-screen lg:overflow-y-auto bg-white dark:bg-[#1a1310] z-10">
        <header className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-black">Estilo do Cardápio</h2>
          <span className="material-symbols-outlined text-primary font-fill cursor-pointer">check_circle</span>
        </header>

        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Paleta de Cores</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'Elegância Noir', colors: ['#1a1310', '#ee6c2b', '#f8f6f6'] },
                { name: 'Tropical Fresh', colors: ['#004d40', '#4db6ac', '#f1f8e9'] },
                { name: 'Gourmet Classic', colors: ['#4e342e', '#8d6e63', '#efebe9'] }
              ].map(pal => (
                <button 
                  key={pal.name}
                  onClick={() => updateConfig('primaryColor', pal.colors[1])}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${menuData.config.primaryColor === pal.colors[1] ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-white/5 hover:border-gray-200'}`}
                >
                  <div className="flex -space-x-2">
                    {pal.colors.map(c => <div key={c} className="size-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" style={{ backgroundColor: c }} />)}
                  </div>
                  <span className="text-sm font-bold">{pal.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Fontes e Textos</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Títulos</label>
                <select value={menuData.config.titleFont} onChange={(e) => updateConfig('titleFont', e.target.value)} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-sm">
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Oswald">Oswald</option>
                  <option value="Work Sans">Work Sans</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Corpo do Texto</label>
                <select value={menuData.config.bodyFont} onChange={(e) => updateConfig('bodyFont', e.target.value)} className="w-full h-12 rounded-xl bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-sm">
                  <option value="Lora">Lora (Serif)</option>
                  <option value="Work Sans">Work Sans (Modern)</option>
                  <option value="Montserrat">Montserrat (Geometric)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-6 pb-20">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Ajustes de Grid</h3>
             <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-8">
               <div className="space-y-4">
                 <div className="flex justify-between text-sm font-bold"><span>Tamanho da Fonte</span><span className="text-primary">{menuData.config.fontSize}px</span></div>
                 <input type="range" min="12" max="24" value={menuData.config.fontSize} onChange={(e) => updateConfig('fontSize', Number(e.target.value))} className="w-full accent-primary" />
               </div>
               <div className="space-y-4">
                 <div className="flex justify-between text-sm font-bold"><span>Espaçamento</span><span className="text-primary">{menuData.config.lineHeight}</span></div>
                 <input type="range" min="1" max="2.5" step="0.1" value={menuData.config.lineHeight} onChange={(e) => updateConfig('lineHeight', Number(e.target.value))} className="w-full accent-primary" />
               </div>
             </div>
          </section>
        </div>
      </div>

      {/* Preview Fixo (Desktop) / Scrollável (Mobile) */}
      <div className="flex-1 bg-gray-100 dark:bg-black/20 flex items-center justify-center p-6 lg:h-screen lg:sticky lg:top-0">
        <div className="w-full max-w-[420px] lg:max-w-[500px] bg-white rounded-xl shadow-2xl p-8 lg:p-12 transition-all duration-500 origin-center" style={{ fontFamily: menuData.config.bodyFont }}>
          <header className="text-center border-b border-gray-100 pb-6 mb-8">
            <h4 style={{ fontFamily: menuData.config.titleFont, color: menuData.config.primaryColor }} className="text-3xl lg:text-4xl font-bold mb-2">
              {menuData.config.restaurantName}
            </h4>
            <p className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">{menuData.config.subtitle}</p>
          </header>
          
          <div className="space-y-8">
            <div>
              <h5 style={{ fontFamily: menuData.config.titleFont }} className="text-lg font-bold border-b border-dotted border-gray-200 pb-2 mb-4">Destaques da Casa</h5>
              <div className="space-y-6">
                 {[1,2].map(i => (
                   <div key={i} className="flex justify-between items-baseline gap-4">
                     <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">Exemplo de Prato {i}</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Uma breve descrição gourmet para exemplificar o espaçamento.</p>
                     </div>
                     <span style={{ color: menuData.config.primaryColor }} className="font-bold text-sm">R$ 45,00</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {!menuData.isPremium && (
            <div className="mt-12 flex items-center justify-center border-t border-gray-50 pt-6">
               <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <span className="material-symbols-outlined text-sm text-gray-400">water_drop</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Marca d'água Visível</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleCustomizer;
