"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  service: any;
  availability: any[];
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function BookingCalendar({
  service,
  availability,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onContinue,
  onBack,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const first = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const last = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = last.getDate();
    const startDay = first.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth]);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const dayAvailability = availability.find((a) => a.day_of_week === dayOfWeek);
    if (!dayAvailability || !dayAvailability.is_available) return [];

    const slots: string[] = [];
    const [startHour, startMin] = dayAvailability.start_time.split(":").map(Number);
    const [endHour, endMin] = dayAvailability.end_time.split(":").map(Number);

    let current = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    current.setHours(startHour, startMin, 0);

    const end = new Date(current);
    end.setHours(endHour, endMin, 0);

    while (current < end) {
      const hours = String(current.getHours()).padStart(2, "0");
      const mins = String(current.getMinutes()).padStart(2, "0");
      slots.push(`${hours}:${mins}`);

      current.setMinutes(current.getMinutes() + service.duration_minutes);
    }

    return slots;
  }, [selectedDate, availability, service.duration_minutes, currentMonth]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Date & Time</CardTitle>
        <CardDescription>Select your preferred appointment date and time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                  )
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              const dateStr =
                day &&
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
                  .toISOString()
                  .split("T")[0];

              const isSelected = dateStr === selectedDate;
              const isPast =
                day &&
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                ) < new Date();

              return (
                <button
                  key={idx}
                  onClick={() => dateStr && onDateSelect(dateStr)}
                  disabled={isPast}
                  className={`p-2 rounded text-center transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : isPast
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div>
            <h3 className="font-semibold mb-3">Available Times</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.length > 0 ? (
                timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={`p-2 rounded text-center text-sm transition-colors ${
                      selectedTime === time
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="col-span-4 text-sm text-gray-600 text-center py-4">
                  No available times for this date
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={onContinue}
            disabled={!selectedDate || !selectedTime}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
