
// api/create-payment-intent.js
// Este arquivo processa a intenção de pagamento de forma segura no servidor.

// A biblioteca 'stripe' deve ser instalada via npm install stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Configuração de cabeçalhos para permitir chamadas do seu frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Tratar requisições de pre-flight (CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Apenas aceitamos POST para criar pagamentos
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { amount, email } = req.body;

    // Validação básica de entrada
    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Valor inválido. O mínimo é 50 centavos.' });
    }

    // Criação da Intenção de Pagamento no Stripe
    // 'amount' é sempre em centavos (ex: 4990 = R$ 49,90)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'brl',
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
      },
      // Metadados ajudam você a organizar suas vendas no painel do Stripe
      metadata: {
        product: 'Menu Pro Premium',
        type: 'Assinatura Anual'
      }
    });

    // Retornamos o clientSecret, que é a chave que o frontend usa para finalizar a cobrança
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Stripe Server Error:', error);
    res.status(500).json({ 
      error: 'Erro ao processar o pagamento no servidor.',
      details: error.message 
    });
  }
}
