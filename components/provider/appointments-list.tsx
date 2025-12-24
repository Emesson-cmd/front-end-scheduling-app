"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/utils";

interface Props {
  appointments: any[];
}

export default function AppointmentsList({ appointments }: Props) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>No appointments scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your upcoming appointments will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>{appointments.length} confirmed appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {appointment.services?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {appointment.customers?.full_name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${appointment.services?.price}
                </p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
