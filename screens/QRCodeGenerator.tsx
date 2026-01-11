
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

const QRCodeGenerator: React.FC<Props> = ({ onBack }) => {
  const [selectedColor, setSelectedColor] = useState('#ee6c2b');
  const [selectedFrame, setSelectedFrame] = useState('Padrão');

  const frames = ['Padrão', 'Clean', 'Peça Aqui', 'Insta-Style'];
  const colors = [
    { name: 'Primary', value: '#ee6c2b' },
    { name: 'Dark', value: '#1b120d' },
    { name: 'Green', value: '#2d5a27' },
    { name: 'Blue', value: '#1a3a5f' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-[#1a1310]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-[#1a1310]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center p-4 justify-between max-w-screen-md mx-auto">
          <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold flex-1 text-center pr-10">Personalizar QR Code</h2>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full pb-32">
        {/* QR Code Preview */}
        <div className="p-8 flex flex-col items-center justify-center">
          <div 
            className="relative w-full aspect-square max-w-[280px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center border-4"
            style={{ borderColor: selectedColor }}
          >
            {/* Frame Text Top */}
            <p 
              className="absolute top-2 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: selectedColor }}
            >
              Escaneie para ver o menu
            </p>

            {/* QR Code Image */}
            <div className="w-full h-full relative group">
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-contain" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtvARzBe1BB9_HnbbH5cQe2TFpXTtkmewctFCWpRnHZpXmInvn5puAnDDGPIdvLqIv2HAJXYlrbdveENXzP2Lot27GzqeCPtdmiq7-5CzJq10R53bL1ITrdiMW9FBTpt-5K_XEXgemiXMz7xM3A3FJ_VV_NSO2GNcyOS-gIwFvMKw_odiT7_-7tRsOw61Q70CTQQeL-erL2XVHUOqW_BiiEit4RBWlYQX124duKWMETUJH6SYNohYbb_hRn1yrT-N0yL8rX0fzsIQ")' }}
              />
              {/* Central Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-14 bg-white rounded-lg shadow-md p-1 flex items-center justify-center">
                  <div className="size-full bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-gray-300">restaurant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Frame Decorative Bottom */}
            <div 
              className="absolute -bottom-3 text-white px-5 py-1.5 rounded-full text-xs font-black shadow-lg"
              style={{ backgroundColor: selectedColor }}
            >
              MENU DIGITAL
            </div>
          </div>
          
          <p className="mt-10 text-xs text-gray-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] font-fill text-primary">verified</span>
            Versão Premium: Alta resolução disponível
          </p>
        </div>

        {/* Customization Controls */}
        <div className="space-y-10 px-4">
          {/* Frames */}
          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Estilos de Moldura</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
              {frames.map((frame) => (
                <button
                  key={frame}
                  onClick={() => setSelectedFrame(frame)}
                  className={`h-11 shrink-0 px-6 rounded-xl text-sm font-bold transition-all ${
                    selectedFrame === frame 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>
          </section>

          {/* Colors */}
          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Cor do QR Code</h3>
            <div className="flex gap-4">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedColor(c.value)}
                  className={`size-11 rounded-full border-2 transition-all ${
                    selectedColor === c.value 
                    ? 'ring-2 ring-offset-2 ring-primary border-white' 
                    : 'border-transparent shadow-sm'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
              <button className="size-11 rounded-full bg-white dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-400">add</span>
              </button>
            </div>
          </section>

          {/* Logo Upload Area */}
          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Logo no Centro</h3>
            <div className="group bg-white dark:bg-white/5 rounded-2xl p-6 border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary transition-all">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary font-fill">image</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Alterar Logo do Restaurante</p>
                <p className="text-[10px] text-gray-400 mt-1">PNG ou SVG recomendado (fundo transparente)</p>
              </div>
            </div>
          </section>

          {/* Visual Example Banner */}
          <section>
            <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-black/50 flex items-center p-6 z-10">
                <p className="text-white text-sm font-black max-w-[160px] leading-tight group-hover:scale-105 transition-transform">Veja como ficará impresso nas suas mesas</p>
              </div>
              <div 
                className="w-full h-full bg-center bg-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeynjOXE8pCTi3WcZzOsWkyYTzCQ9x2QTwsxFxmLVIngvetIVBOzeLmYCty1irsbXh0H9FCvbLVv8q3jmVQyTGFBkaYw90hrnMUIxat-Uo5vsKaa-67E-p74nmlFk1IX1_Z802DjafECPwGlT-oZakZhxVFVpZJK4X2Dxke80oq4bQ88N4U1f_CD9UndG3dU08Hq4guXTmqbtr9SetZzT73oyN1aISXaDzyW4Iz-_2Z5ZrQwi0jL2cZCV2JVAe9Cw-YyfY-_zs3bs")' }}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 md:left-auto md:w-full md:max-w-md bg-white/95 dark:bg-[#1a1310]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10 p-4 pb-10 z-50">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-black text-sm hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined">qr_code_2</span>
            Adesivo
          </button>
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined">download</span>
            Exportar
          </button>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeGenerator;
