
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

type PaymentProvider = 'stripe' | 'paypal' | 'pix';
type PaymentStep = 'selection' | 'processing' | 'success' | 'error';

const Checkout: React.FC<Props> = ({ onBack, onComplete }) => {
  const [provider, setProvider] = useState<PaymentProvider>('stripe');
  const [step, setStep] = useState<PaymentStep>('selection');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [email, setEmail] = useState('');

  const handleCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 16);
    const matched = cleaned.match(/.{1,4}/g);
    setCardNumber(matched ? matched.join(' ') : cleaned);
  };

  const handleExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length >= 2) {
      setExpiry(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  const initiatePayment = async () => {
    if (!email || (provider === 'stripe' && !cardNumber)) {
      setStep('error');
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      // 1. Chamada para o backend que acabamos de criar
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 4990, // R$ 49,90 em centavos
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na comunicação com o servidor.');
      }

      // 2. Com o clientSecret em mãos, o próximo passo real seria usar 
      // o Stripe Elements para confirmar o pagamento.
      // Por agora, simulamos a confirmação após o backend responder OK.
      console.log('Pagamento Iniciado com Sucesso. Secret:', data.clientSecret);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('success');
    } catch (err: any) {
      console.error('Erro no Checkout:', err.message);
      setStep('error');
      setErrorMessage(`Falha na conexão: ${err.message}. Certifique-se de que o backend está configurado na Vercel.`);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#1a1310] p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="size-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30">
          <span className="material-symbols-outlined text-5xl font-black">check_circle</span>
        </div>
        <h1 className="text-3xl font-black mb-4">Acesso Liberado!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xs mx-auto">
          Obrigado! Seu restaurante agora é **Premium**. Todas as funções foram desbloqueadas.
        </p>
        <button 
          onClick={onComplete}
          className="w-full max-w-xs bg-primary text-white font-black py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform"
        >
          Ir para o Painel
        </button>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#1a1310] p-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="size-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl font-black">warning</span>
        </div>
        <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">Atenção</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto text-sm">
          {errorMessage}
        </p>
        <div className="flex flex-col w-full max-w-xs gap-3">
          <button 
            onClick={() => setStep('selection')}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Tentar Novamente
          </button>
          <button 
            onClick={() => setStep('success')}
            className="w-full bg-gray-100 dark:bg-white/5 text-gray-400 font-bold py-3 rounded-2xl text-xs"
          >
            Pular Pagamento (Teste)
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#1a1310] p-6 text-center">
        <div className="relative size-20 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-black mb-2">Processando...</h2>
        <p className="text-gray-500 dark:text-gray-400">Isso pode levar alguns segundos.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfaf9] dark:bg-[#120c0a] text-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a1310]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <div className="max-w-md mx-auto flex items-center justify-between p-4">
          <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-primary font-fill">verified_user</span>
             <h2 className="font-bold text-xs uppercase tracking-widest">Checkout Seguro</h2>
          </div>
          <div className="size-10" />
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full p-6 pb-40">
        <div className="bg-white dark:bg-[#1a1310] rounded-3xl p-6 mb-8 border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-black">Plano Premium</h3>
            <p className="text-2xl font-black text-primary">R$ 49,90</p>
          </div>
          <p className="text-xs text-gray-500 italic">Pagamento único, acesso vitalício.</p>
        </div>

        <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl">
          <button onClick={() => setProvider('stripe')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${provider === 'stripe' ? 'bg-white dark:bg-[#2d1e16] shadow-md text-primary' : 'text-gray-500'}`}>
            <span className="material-symbols-outlined text-sm font-fill">credit_card</span> Cartão
          </button>
          <button onClick={() => setProvider('pix')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${provider === 'pix' ? 'bg-white dark:bg-[#2d1e16] shadow-md text-green-500' : 'text-gray-500'}`}>
            <span className="material-symbols-outlined text-sm font-fill">bolt</span> PIX
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail para Recebimento</label>
            <input 
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 text-sm font-bold"
            />
          </div>

          {provider === 'stripe' && (
            <div className="space-y-4 animate-in fade-in duration-500">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Número do Cartão</label>
                  <input 
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => handleCardNumber(e.target.value)}
                    className="w-full h-14 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 text-sm font-bold tracking-[0.2em]"
                  />
               </div>
               <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiração</label>
                    <input 
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={(e) => handleExpiry(e.target.value)}
                      className="w-full h-14 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 text-sm font-bold text-center"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVC</label>
                    <input 
                      placeholder="123"
                      maxLength={3}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-14 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 text-sm font-bold text-center"
                    />
                  </div>
               </div>
            </div>
          )}

          {provider === 'pix' && (
            <div className="text-center py-10 animate-in fade-in duration-500 flex flex-col items-center">
               <div className="size-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                 <span className="material-symbols-outlined text-4xl font-fill">qr_code_2</span>
               </div>
               <h4 className="font-bold mb-2">Liberação Instantânea via PIX</h4>
               <p className="text-sm text-gray-500">O QR Code será gerado após o clique em confirmar.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1a1310]/95 backdrop-blur-md p-6 border-t border-gray-100 dark:border-white/5 z-20">
         <div className="max-w-md mx-auto">
            <button 
              onClick={initiatePayment}
              disabled={loading}
              className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">{provider === 'stripe' ? 'shield' : 'bolt'}</span>
              <span>{loading ? 'Processando...' : `Pagar R$ 49,90`}</span>
            </button>
         </div>
      </footer>
    </div>
  );
};

export default Checkout;
