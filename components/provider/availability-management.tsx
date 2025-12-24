"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
  providerId: string;
}

export default function AvailabilityManagement({ providerId }: Props) {
  const [availability, setAvailability] = useState<Record<number, { start: string; end: string; available: boolean }>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleAvailabilityChange = (dayIndex: number, field: string, value: any) => {
    setAvailability((prev) => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const supabase = createClient();

    try {
      // Delete existing availability
      await supabase.from("availability").delete().eq("provider_id", providerId);

      // Insert new availability
      const records = Object.entries(availability)
        .filter(([_, data]) => data.available)
        .map(([dayIndex, data]) => ({
          provider_id: providerId,
          day_of_week: parseInt(dayIndex),
          start_time: data.start,
          end_time: data.end,
          is_available: true,
        }));

      if (records.length > 0) {
        await supabase.from("availability").insert(records);
      }
    } catch (error) {
      console.error("Error saving availability:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Working Hours</CardTitle>
        <CardDescription>Set your availability for each day of the week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-900">{day}</label>
                <input
                  type="checkbox"
                  checked={availability[index]?.available ?? true}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "available", e.target.checked)
                  }
                  className="w-4 h-4 rounded"
                />
              </div>
              {(availability[index]?.available ?? true) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={availability[index]?.start ?? "09:00"}
                      onChange={(e) =>
                        handleAvailabilityChange(index, "start", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={availability[index]?.end ?? "17:00"}
                      onChange={(e) =>
                        handleAvailabilityChange(index, "end", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Availability"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
