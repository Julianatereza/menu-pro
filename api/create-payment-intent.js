
// api/create-payment-intent.js
import Stripe from 'stripe';

// Inicializa o Stripe com a chave secreta das variáveis de ambiente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { amount, email } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'brl',
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product: 'Menu Pro Premium',
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
}
