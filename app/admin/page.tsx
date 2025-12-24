import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/admin-dashboard';
import { providers } from '@/mocks/provider.mock';
import { customers } from '@/mocks/customers.mock';
import { appointments, recentAppointments } from '@/mocks/appointments.mock';

export default async function AdminPage() {
  const stats = {
    totalProviders: providers.length,
    totalCustomers: customers.length,
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter((a) => a.status === 'confirmed')
      .length,
    completedAppointments: appointments.filter((a) => a.status === 'completed')
      .length,
    revenue: appointments.reduce((sum, a) => {
      // Calculate from services - simplified
      return sum;
    }, 0),
  };

  return (
    <AdminDashboard stats={stats} recentAppointments={recentAppointments} />
  );
}
