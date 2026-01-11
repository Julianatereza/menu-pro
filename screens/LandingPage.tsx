
import React from 'react';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="font-display">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-[#1a1310]/90 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between max-w-screen-md mx-auto">
          <div className="text-[#1b120d] dark:text-[#fcf9f8] flex size-12 shrink-0 items-center justify-start">
            <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
          </div>
          <h2 className="text-[#1b120d] dark:text-[#fcf9f8] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Menu Pro</h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#1b120d] dark:text-[#fcf9f8] p-0">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto">
        {/* Hero Section */}
        <section className="@container">
          <div className="@[480px]:p-4">
            <div 
              className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-6 text-center" 
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuASont35i-jvpPWkMtH8R3J0LloQETxPubf47VSBxOYzPCK4ob5BpnzGOQWwSWcu1_3Gxz88foS4nXQ03nuxb0mYRRn-LSuOg3w6jL3_j-Uowz8wju6vFkVxm0mBTErVD5EU1jphiN3eF1mukYvqTX6nloET8h49M-0xjFVacJfIgyA_hkmGjawyQlC0i4-SxaudLjfxDgBzFRfnmnXeLYWvStIetWBoHh1xyPeGtLq6qd1xX3MmbrwREAvebG_cKOgNLUIjHP4hVo")'
              }}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                  Transforme seu Cardápio em uma Obra de Arte Digital
                </h1>
                <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg max-w-lg mx-auto">
                  Crie menus profissionais em minutos, atraia mais clientes e economize com impressões.
                </h2>
              </div>
              <button 
                onClick={onStart}
                className="flex min-w-[220px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:scale-105 transition-transform"
              >
                <span className="truncate">Começar a Criar Agora</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section Header */}
        <section className="px-4 pt-10 pb-2">
          <h2 className="text-[#1b120d] dark:text-[#fcf9f8] text-[24px] font-bold leading-tight tracking-[-0.015em]">Por que escolher o Menu Pro?</h2>
          <p className="text-[#9a664c] dark:text-[#d7b4a3] text-sm mt-1">A solução completa para o visual do seu negócio.</p>
        </section>

        {/* Feature Section */}
        <section className="flex flex-col gap-6 px-4 py-6 @container">
          <div className="grid grid-cols-1 @[480px]:grid-cols-3 gap-4 p-0">
            {/* Feature 1 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-[#e7d7cf] dark:border-[#4d3a31] bg-white dark:bg-[#2d1f18] p-5 flex-col shadow-sm">
              <div className="text-primary p-2 bg-primary/10 rounded-lg w-fit">
                <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#1b120d] dark:text-[#fcf9f8] text-lg font-bold leading-tight">Modelos Exclusivos</h2>
                <p className="text-[#9a664c] dark:text-[#d7b4a3] text-sm font-normal leading-normal">Designs gastronômicos premium criados por especialistas para cada tipo de culinária.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-[#e7d7cf] dark:border-[#4d3a31] bg-white dark:bg-[#2d1f18] p-5 flex-col shadow-sm">
              <div className="text-primary p-2 bg-primary/10 rounded-lg w-fit">
                <span className="material-symbols-outlined text-3xl">edit_note</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#1b120d] dark:text-[#fcf9f8] text-lg font-bold leading-tight">Edição Fácil</h2>
                <p className="text-[#9a664c] dark:text-[#d7b4a3] text-sm font-normal leading-normal">Interface intuitiva para atualizar pratos, fotos e preços instantaneamente pelo celular.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-1 gap-4 rounded-xl border border-[#e7d7cf] dark:border-[#4d3a31] bg-white dark:bg-[#2d1f18] p-5 flex-col shadow-sm">
              <div className="text-primary p-2 bg-primary/10 rounded-lg w-fit">
                <span className="material-symbols-outlined text-3xl">qr_code_2</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#1b120d] dark:text-[#fcf9f8] text-lg font-bold leading-tight">QR Code Integrado</h2>
                <p className="text-[#9a664c] dark:text-[#d7b4a3] text-sm font-normal leading-normal">Gere códigos prontos para impressão e acesso rápido e higiênico dos seus clientes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Card */}
        <section className="p-4">
          <div 
            className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[160px] shadow-xl overflow-hidden relative group" 
            style={{
              backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpqAtQWBmtGLMsyBN_IUaJJc69My5uugRrtQN8MdPXk9JxyGK17e33g2pmim49I3BhGx907-X_XmyGqcN6_vDq_0LORVItXwqdVHAf83pHYmKa4OtFCdhIqZKnhdCiOvV2bh7sD-jN8onPjvPf8h5hVlTTivunLcC6eFXRiz5O9pRccl9DrLepaqe74clMEwbOKI_K0-XdI8f6zY0NYSuu11Xq2bXmFKUvm5kbK3Zom4GQhKw6sNGQlslkpzehKLt5ltZG2cY65D8")'
            }}
          >
            <div className="flex w-full flex-col md:flex-row items-end justify-between gap-4 p-6 relative z-10">
              <div className="flex max-w-[440px] flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Premium</span>
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">Exportação Profissional</p>
                </div>
                <p className="text-white/80 text-sm font-medium leading-normal">Gere PDFs em alta resolução sem marca d'água para uma imagem impecável da sua marca.</p>
              </div>
              <button 
                onClick={onStart}
                className="flex min-w-[160px] w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
              >
                <span className="truncate">Ver Planos</span>
              </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="p-4 pb-12">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-1 text-primary mb-4">
              <span className="material-symbols-outlined text-xl">star</span>
              <span className="material-symbols-outlined text-xl">star</span>
              <span className="material-symbols-outlined text-xl">star</span>
              <span className="material-symbols-outlined text-xl">star</span>
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
            <p className="text-[#1b120d] dark:text-[#fcf9f8] text-lg italic leading-relaxed mb-6">
              "O Menu Pro mudou o patamar do meu restaurante. Meus clientes elogiam a facilidade e o design. O faturamento aumentou desde que profissionalizamos o cardápio."
            </p>
            <div className="flex items-center gap-4">
              <div 
                className="size-12 rounded-full bg-cover bg-center" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1g88D8ZsBoVkBQ_gxPb2pPoba76WRi5T5nuOlx3n50IJGLmsqSfcXxwUNyFDJKQFYmN-w_Fr4Aohr2EzF9UgZN8RdFo0Xpo1E-3dOqsNTSB6SARlx-DzCV6R3ryoWzgYI4p9-1HJi2G4q7i9Bu-Q0_PxXWx4fbWv8vWB_InvSJArf5El_GyTpN5DXPfwlmhGsFdhZUydb_q4uSXnqa3AycNZZyIMlZBIzA_8G3l0G3AEL1EAW5M4B9Uqznl1xY_t2x2_67y7WSCI")'}}
              >
              </div>
              <div>
                <p className="font-bold text-[#1b120d] dark:text-[#fcf9f8]">João Silva</p>
                <p className="text-sm text-[#9a664c] dark:text-[#d7b4a3]">Proprietário, Bistro Paris</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 text-center border-t border-[#e7d7cf] dark:border-[#4d3a31]">
          <p className="text-sm text-[#9a664c] dark:text-[#d7b4a3]">© 2024 Menu Pro. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 mt-4 text-[#9a664c] dark:text-[#d7b4a3]">
            <span className="material-symbols-outlined cursor-pointer">social_leaderboard</span>
            <span className="material-symbols-outlined cursor-pointer">photo_camera</span>
            <span className="material-symbols-outlined cursor-pointer">share</span>
          </div>
        </footer>
      </main>
      
      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default LandingPage;
