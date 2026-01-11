
import React from 'react';
import { MenuData, Category, MenuItem } from '../types';
import { suggestMenuDescription } from '../geminiService';

interface Props {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
  onExport: () => void;
}

const ItemEditor: React.FC<Props> = ({ menuData, setMenuData, onExport }) => {
  const calculateProgress = () => {
    let totalFields = 0;
    let filledFields = 0;
    menuData.categories.forEach(cat => {
      cat.items.forEach(item => {
        totalFields += 3;
        if (item.name) filledFields++;
        if (item.description) filledFields++;
        if (item.price) filledFields++;
      });
    });
    return totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
  };

  const progress = calculateProgress();

  const updateItem = (catId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === catId ? {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
      } : cat)
    }));
  };

  const deleteItem = (catId: string, itemId: string) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === catId ? {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      } : cat)
    }));
  };

  const addItem = (catId: string) => {
    const newItem: MenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      price: 'R$ 0,00'
    };
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === catId ? {
        ...cat,
        items: [...cat.items, newItem]
      } : cat)
    }));
  };

  const handleMagicSuggest = async (catId: string, item: MenuItem) => {
    if (!item.name) return;
    const suggestion = await suggestMenuDescription(item.name, menuData.config.subtitle);
    updateItem(catId, item.id, 'description', suggestion);
  };

  return (
    <div className="pb-32">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-[#1a1310]/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center p-4 pb-2 justify-between">
          <h2 className="text-gray-900 dark:text-white text-lg font-bold flex-1">Editor de Itens</h2>
          <div className="flex items-center gap-3">
             <button onClick={onExport} className="bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-full border border-primary/20">
              Upgrade Pro
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 pt-0">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Preenchimento</p>
            <p className="text-primary text-sm font-bold">{progress}%</p>
          </div>
          <div className="rounded-full bg-gray-200 dark:bg-white/10 h-2 overflow-hidden">
            <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {menuData.categories.map(cat => (
          <details key={cat.id} className="group rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden" open>
            <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 list-none transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">drag_indicator</span>
                <p className="text-gray-900 dark:text-white text-base font-semibold">{cat.name}</p>
              </div>
              <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            
            <div className="p-4 pt-0 space-y-6 border-t border-gray-100 dark:border-white/5 mt-2">
              {cat.items.map((item, idx) => (
                <div key={item.id} className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Item {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    <button onClick={() => deleteItem(cat.id, item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                       {/* Image Link Support */}
                       <div className="flex flex-col gap-2 w-24">
                          <div className={`size-24 rounded-xl border border-dashed flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-black/20 ${item.imageUrl ? 'border-transparent' : 'border-gray-300 dark:border-white/10'}`}>
                            {item.imageUrl ? (
                               <img src={item.imageUrl} alt="preview" className="w-full h-full object-cover" onError={() => updateItem(cat.id, item.id, 'imageUrl', '')} />
                            ) : (
                               <span className="material-symbols-outlined text-gray-300">image</span>
                            )}
                          </div>
                       </div>
                       <div className="flex-1 space-y-4">
                          <label className="flex flex-col">
                            <p className="text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest pb-1.5">Nome do Prato</p>
                            <input 
                              value={item.name}
                              onChange={(e) => updateItem(cat.id, item.id, 'name', e.target.value)}
                              className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold"
                              placeholder="Ex: Risoto"
                            />
                          </label>
                          <label className="flex flex-col">
                            <p className="text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest pb-1.5">Link da Imagem</p>
                            <input 
                              value={item.imageUrl || ''}
                              onChange={(e) => updateItem(cat.id, item.id, 'imageUrl', e.target.value)}
                              className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px]"
                              placeholder="Cole o link da foto aqui..."
                            />
                          </label>
                       </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <label className="flex flex-col flex-[2] relative">
                        <div className="flex items-center justify-between pb-1.5">
                          <p className="text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest">Descrição</p>
                          <button onClick={() => handleMagicSuggest(cat.id, item)} className="text-primary flex items-center gap-1 text-[9px] font-bold uppercase">
                            <span className="material-symbols-outlined text-xs font-fill">auto_awesome</span> IA
                          </button>
                        </div>
                        <textarea 
                          value={item.description}
                          onChange={(e) => updateItem(cat.id, item.id, 'description', e.target.value)}
                          className="w-full h-24 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs resize-none"
                          placeholder="Ingredientes..."
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <p className="text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest pb-1.5">Preço</p>
                        <input 
                          value={item.price}
                          onChange={(e) => updateItem(cat.id, item.id, 'price', e.target.value)}
                          className="w-full h-11 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-center"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => addItem(cat.id)}
                className="w-full py-3 flex items-center justify-center gap-2 text-primary font-bold text-xs border-2 border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Novo Item
              </button>
            </div>
          </details>
        ))}
      </main>
    </div>
  );
};

export default ItemEditor;
