
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
        items: cat.items.filter(item => item.id === itemId)
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
          <div className="text-gray-800 dark:text-white flex size-12 shrink-0 items-center">
            <span className="material-symbols-outlined">chevron_left</span>
          </div>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold flex-1 text-center">Editor de Itens</h2>
          <div className="flex w-12 items-center justify-end">
            <button onClick={onExport} className="text-primary text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm font-fill">workspace_premium</span>
              Exportar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 pt-0">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Progresso do Cardápio</p>
            <p className="text-primary text-sm font-bold">{progress}%</p>
          </div>
          <div className="rounded-full bg-gray-200 dark:bg-white/10 h-2 overflow-hidden">
            <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[10px]">Preencha todos os campos para um cardápio profissional.</p>
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
                    <label className="flex flex-col">
                      <p className="text-gray-700 dark:text-gray-300 text-xs font-semibold pb-1.5">Nome do Prato</p>
                      <input 
                        value={item.name}
                        onChange={(e) => updateItem(cat.id, item.id, 'name', e.target.value)}
                        className="form-input rounded-lg border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary focus:ring-1 focus:ring-primary h-12 text-sm"
                        placeholder="Ex: Bruschetta de Tomate"
                      />
                    </label>
                    
                    <div className="flex gap-3">
                      <label className="flex flex-col flex-[2] relative">
                        <div className="flex items-center justify-between pb-1.5">
                          <p className="text-gray-700 dark:text-gray-300 text-xs font-semibold">Descrição</p>
                          <button 
                            onClick={() => handleMagicSuggest(cat.id, item)}
                            className="text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
                            title="Sugestão com IA"
                          >
                            <span className="material-symbols-outlined text-xs font-fill">auto_awesome</span>
                            <span className="text-[9px] font-bold uppercase">IA Sugere</span>
                          </button>
                        </div>
                        <textarea 
                          value={item.description}
                          onChange={(e) => updateItem(cat.id, item.id, 'description', e.target.value)}
                          className="form-input resize-none rounded-lg border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px] text-xs"
                          placeholder="Ingredientes e detalhes..."
                        />
                      </label>
                      <label className="flex flex-col flex-1">
                        <p className="text-gray-700 dark:text-gray-300 text-xs font-semibold pb-1.5">Preço</p>
                        <input 
                          value={item.price}
                          onChange={(e) => updateItem(cat.id, item.id, 'price', e.target.value)}
                          className="form-input rounded-lg border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary focus:ring-1 focus:ring-primary h-12 text-sm text-center"
                          placeholder="R$ 0,00"
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
                Adicionar Item em {cat.name}
              </button>
            </div>
          </details>
        ))}
      </main>

      <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-40">
        <button className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-white/10 rounded-full px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 mb-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary text-xl font-fill">create_new_folder</span>
          Nova Categoria
        </button>
        <button className="size-14 flex items-center justify-center rounded-full bg-primary text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default ItemEditor;
