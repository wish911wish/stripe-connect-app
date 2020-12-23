import {loadStripe} from '@stripe/stripe-js';

// Stripeにクレカ情報をPOSTするためのライプラリ
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default stripePromise