import CustomerAppointments from '@/components/customer/customer-appointments';
import { appointments } from '@/mocks/appointments.mock';
import { Appointment } from '@/models/appointment.model';

export default async function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
        </div>
      </header>
      <CustomerAppointments appointments={appointments} />
    </div>
  );
}
