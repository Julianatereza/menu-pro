
import React from 'react';
import { MenuData } from '../types';

interface Props {
  menuData: MenuData;
  onEdit: () => void;
  onPreview: () => void;
  onTemplates: () => void;
}

const Dashboard: React.FC<Props> = ({ menuData, onEdit, onPreview, onTemplates }) => {
  // O link oficial é o domínio da vercel, mas usamos o origin para o preview
  const publicLink = window.location.origin.includes('vercel.app') 
    ? window.location.origin 
    : 'https://menu-pro-737c.vercel.app';

  const stats = [
    { label: 'Pratos Ativos', value: menuData.categories.reduce((acc, cat) => acc + cat.items.length, 0), icon: 'restaurant', color: 'text-orange-500' },
    { label: 'Visualizações', value: '0', icon: 'monitoring', color: 'text-blue-500' },
    { label: 'Categorias', value: menuData.categories.length, icon: 'list_alt', color: 'text-purple-500' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    alert('Link oficial copiado para o WhatsApp!');
  };

  return (
    <div className="p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Administração</p>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Painel do Proprietário</h1>
        </div>
        <div className="flex gap-2">
           <button onClick={onPreview} className="bg-black text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
             <span className="material-symbols-outlined text-sm">visibility</span> Ver Cardápio Público
           </button>
        </div>
      </header>

      {/* Link de Compartilhamento - Destaque */}
      <section className="bg-gradient-to-br from-primary to-[#ff8c52] rounded-[2rem] p-8 mb-10 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
           <span className="material-symbols-outlined text-[120px]">share</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Link do seu Cardápio Digital</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md">Envie este link para seus clientes ou coloque na sua Bio do Instagram.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-white/20 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center justify-between border border-white/30">
              <span className="text-sm font-mono truncate mr-4">{publicLink}</span>
              <button onClick={copyLink} className="shrink-0 hover:scale-120 transition-transform">
                <span className="material-symbols-outlined text-sm font-fill">content_copy</span>
              </button>
            </div>
            <button onClick={copyLink} className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-50 transition-colors shadow-xl">
              Copiar para WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Estatísticas Rápida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:shadow-lg transition-shadow">
            <div className={`size-14 rounded-2xl bg-gray-50 dark:bg-black/20 flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-2xl font-fill">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ações de Edição */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Gerenciar Conteúdo</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={onEdit} className="aspect-square flex flex-col items-center justify-center gap-4 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-primary font-fill">edit_square</span>
              </div>
              <span className="font-bold text-sm">Editar Itens e Fotos</span>
            </button>
            <button onClick={onTemplates} className="aspect-square flex flex-col items-center justify-center gap-4 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/10 hover:border-primary hover:bg-primary/5 transition-all group">
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-primary font-fill">dashboard_customize</span>
              </div>
              <span className="font-bold text-sm">Alterar Design</span>
            </button>
          </div>
        </section>

        {/* Dicas e Suporte */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Suporte ao Dono</h3>
          <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 flex flex-col gap-6">
            <div className="flex gap-4">
               <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
               <div>
                  <p className="font-bold text-sm mb-1">Como adicionar fotos?</p>
                  <p className="text-xs text-gray-500 leading-relaxed">No Editor, cole o link direto da imagem (terminado em .jpg ou .png). Pratos com fotos vendem até 30% mais!</p>
               </div>
            </div>
            <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
               <p className="text-xs font-bold text-gray-400">Dúvidas sobre o Premium?</p>
               <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">Falar com Suporte</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
