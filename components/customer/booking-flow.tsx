"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingCalendar from "./booking-calendar";

interface Props {
  provider: any;
  services: any[];
  availability: any[];
  userId: string;
}

type Step = "service" | "date-time" | "confirm" | "success";

export default function BookingFlow({
  provider,
  services,
  availability,
  userId,
}: Props) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = services.find((s) => s.id === selectedService);

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const { data: appointmentData, error } = await supabase.from("appointments").insert({
        customer_id: userId,
        service_id: selectedService,
        provider_id: provider.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: notes,
        status: "confirmed",
      }).select().single();

      if (error) throw error;

      // Send confirmation emails
      await fetch('/api/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId: appointmentData.id,
        }),
      });

      setStep("success");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Booking Confirmed!</CardTitle>
            <CardDescription>Your appointment has been scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-900">
                Thank you for booking with {provider.business_name}
              </p>
              <p className="text-sm text-green-700 mt-1">
                You will receive a confirmation email shortly.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Service</p>
                <p className="font-medium">{service?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-medium">
                  {new Date(selectedDate!).toLocaleDateString()} at {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-medium">${service?.price}</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" href="/customer/appointments">
              View My Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {provider.business_name}
          </h1>
          <p className="text-gray-600 mt-1">Book Your Appointment</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[
            { id: "service", label: "Select Service" },
            { id: "date-time", label: "Choose Date & Time" },
            { id: "confirm", label: "Confirm Booking" },
          ].map((s, idx) => (
            <div
              key={s.id}
              className={`p-3 rounded-lg text-center font-medium ${
                step === s.id
                  ? "bg-blue-600 text-white"
                  : step === "success" || 
                    (step === "confirm" && idx <= 2) ||
                    (step === "date-time" && idx <= 1)
                  ? "bg-green-100 text-green-900"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {step === "service" && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Service</CardTitle>
              <CardDescription>Choose the service you want to book</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">
                      {service.duration_minutes} mins
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      ${service.price}
                    </span>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => setStep("date-time")}
                disabled={!selectedService}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "date-time" && selectedService && (
          <BookingCalendar
            service={service}
            availability={availability}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onContinue={() => setStep("confirm")}
            onBack={() => setStep("service")}
          />
        )}

        {step === "confirm" && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Booking</CardTitle>
              <CardDescription>Review your appointment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-semibold text-lg">{service?.name}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold text-lg">
                    {new Date(selectedDate!).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {selectedTime}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold text-lg text-blue-600">
                    ${service?.price}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Let the provider know if you have any special requests"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("date-time")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
