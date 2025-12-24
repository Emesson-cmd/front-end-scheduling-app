"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";

interface Props {
  appointments: any[];
}

export default function CustomerAppointments({ appointments }: Props) {
  const confirmed = appointments.filter((a) => a.status === "confirmed");
  const completed = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">
            {appointment.services?.name}
          </h4>
          <p className="text-sm text-gray-600">
            at {appointment.providers?.business_name}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            appointment.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : appointment.status === "completed"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <p className="text-gray-600">
          📅 {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
        </p>
        {appointment.providers?.address && (
          <p className="text-gray-600">
            📍 {appointment.providers.address}, {appointment.providers.city}
          </p>
        )}
        {appointment.providers?.phone && (
          <p className="text-gray-600">📞 {appointment.providers.phone}</p>
        )}
      </div>

      <div className="pt-3 border-t flex justify-between items-center">
        <span className="font-semibold">${appointment.services?.price}</span>
        {appointment.status === "confirmed" && (
          <Button variant="outline" size="sm">
            Reschedule
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {confirmed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>{confirmed.length} confirmed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {confirmed.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </CardContent>
        </Card>
      )}

      {completed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>{completed.length} completed appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completed.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </CardContent>
        </Card>
      )}

      {cancelled.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cancelled</CardTitle>
            <CardDescription>{cancelled.length} cancelled appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cancelled.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </CardContent>
        </Card>
      )}

      {appointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No appointments yet</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Browse Services
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
