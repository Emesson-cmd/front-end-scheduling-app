import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, appointmentId } = await request.json();
    const supabase = await createClient();

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update appointment with payment ID
      const { error } = await supabase
        .from('appointments')
        .update({
          stripe_payment_id: paymentIntentId,
          status: 'confirmed',
        })
        .eq('id', appointmentId);

      if (error) throw error;

      return NextResponse.json({
        success: true,
        message: 'Payment confirmed and appointment updated',
      });
    }

    return NextResponse.json(
      { error: 'Payment was not successful' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
