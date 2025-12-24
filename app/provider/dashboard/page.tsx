import ProviderDashboard from '@/components/provider/provider-dashboard';
import { appointments } from '@/mocks/appointments.mock';
import { user } from '@/mocks/user..mock';
import { provider } from '@/mocks/provider.mock';
import { services } from '@/mocks/services.mock';

export default async function ProviderDashboardPage() {
  return (
    <ProviderDashboard
      provider={provider}
      services={services}
      appointments={appointments}
      userId={user.id}
    />
  );
}
