"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  providers: any[];
}

export default function ServiceBrowser({ providers }: Props) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const filteredProviders = selectedProvider
    ? providers.filter((p) => p.id === selectedProvider)
    : providers;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Provider Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{provider.business_name}</CardTitle>
              <CardDescription>{provider.description || "Service Provider"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {provider.address && (
                  <p className="text-sm text-gray-600">
                    📍 {provider.address}, {provider.city}, {provider.state} {provider.zip_code}
                  </p>
                )}
                {provider.phone && (
                  <p className="text-sm text-gray-600">📞 {provider.phone}</p>
                )}
              </div>

              {provider.services && provider.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Services Offered:</h4>
                  <div className="space-y-2">
                    {provider.services.slice(0, 3).map((service: any) => (
                      <div
                        key={service.id}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>{service.name}</span>
                        <span className="font-medium">${service.price}</span>
                      </div>
                    ))}
                    {provider.services.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{provider.services.length - 3} more services
                      </p>
                    )}
                  </div>
                </div>
              )}

              <Link href={`/customer/booking/${provider.id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {providers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No service providers available yet.</p>
        </div>
      )}
    </div>
  );
}
