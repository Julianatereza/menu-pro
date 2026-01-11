
import React, { useState } from 'react';
import { TEMPLATES } from '../constants';

interface Props {
  onSelectTemplate: () => void;
}

const TemplateGallery: React.FC<Props> = ({ onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Bares', 'Restaurantes', 'Pizzarias', 'Cafés', 'Hamburguerias', 'Japonês'];

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesCategory = activeCategory === 'Todos' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 px-4 md:px-8 pt-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">Seus Modelos</h1>
            <p className="text-gray-500 text-sm md:text-base">Selecione um design base e personalize do seu jeito.</p>
          </div>
          <div className="flex gap-2">
             <div className="relative flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                  placeholder="Buscar modelo..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-11 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-primary focus:border-primary transition-all" 
                />
             </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`h-10 shrink-0 px-6 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 text-gray-600 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((t) => (
            <div key={t.id} className="flex flex-col gap-4 group animate-in fade-in zoom-in duration-300">
              <div 
                className="relative w-full aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-2xl shadow-md overflow-hidden cursor-pointer group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300"
                style={{ backgroundImage: `url("${t.image}")` }}
                onClick={onSelectTemplate}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {(t.premium || t.new) && (
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-black/80 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm z-20">
                    {t.premium ? 'Premium' : 'Novo'}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-20">
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate();
                    }}
                    className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs shadow-xl hover:bg-gray-100 transition-colors"
                  >
                    Visualizar Edição
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 px-1">
                <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight">{t.name}</h3>
                <p className="text-primary text-xs font-semibold tracking-wide uppercase">{t.tagline}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p className="text-lg font-medium">Nenhum modelo encontrado nesta categoria.</p>
            <button onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }} className="mt-4 text-primary font-bold hover:underline">Ver todos os modelos</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplateGallery;
