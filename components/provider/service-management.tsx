"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  services: any[];
  providerId: string;
}

export default function ServiceManagement({ services: initialServices, providerId }: Props) {
  const [services, setServices] = useState(initialServices);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_minutes: 60,
    price: "",
  });

  const handleAddService = async () => {
    if (!formData.name || !formData.price) return;

    const supabase = createClient();
    const { data, error } = await supabase.from("services").insert({
      provider_id: providerId,
      name: formData.name,
      description: formData.description,
      duration_minutes: formData.duration_minutes,
      price: parseFloat(formData.price),
    });

    if (!error) {
      setServices([...services, data[0]]);
      setFormData({ name: "", description: "", duration_minutes: 60, price: "" });
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Manage the services you offer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {service.duration_minutes} mins • ${service.price}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Haircut, Manicure"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Describe your service"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_minutes: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setFormData({
                      name: "",
                      description: "",
                      duration_minutes: 60,
                      price: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddService}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Service
                </Button>
              </div>
            </div>
          )}

          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Add New Service
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
