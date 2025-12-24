"use client";

import { loadStripe } from "@stripe/js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface Props {
  appointmentId: string;
  amount: number;
  customerEmail: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentModal({
  appointmentId,
  amount,
  customerEmail,
  onSuccess,
  onCancel,
}: Props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        appointmentId={appointmentId}
        amount={amount}
        customerEmail={customerEmail}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}

function PaymentForm({
  appointmentId,
  amount,
  customerEmail,
  onSuccess,
  onCancel,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const intentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          appointmentId,
          customerEmail,
        }),
      });

      const { clientSecret } = await intentResponse.json();

      // Confirm payment with card
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: customerEmail,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        return;
      }

      // Confirm payment on server
      await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: clientSecret.split("_secret_")[0],
          appointmentId,
        }),
      });

      onSuccess();
    } catch (err) {
      setError("Payment processing failed. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
        <CardDescription>Secure payment via Stripe</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 border rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="text-xl font-bold text-blue-600">${amount}</span>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || !stripe}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
