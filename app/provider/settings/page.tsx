import ProviderSettings from '@/components/provider/provider-settings';
import { provider } from '@/mocks/provider.mock';
import { user } from '@/mocks/user..mock';

export default async function ProviderSettingsPage() {
  return <ProviderSettings provider={provider} userId={user.id} />;
}
