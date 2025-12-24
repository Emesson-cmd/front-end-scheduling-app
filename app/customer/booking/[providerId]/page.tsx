import BookingFlow from '@/components/customer/booking-flow';
import { availability } from '@/mocks/availability.mock';
import { provider } from '@/mocks/provider.mock';
import { services } from '@/mocks/services.mock';
import { user } from '@/mocks/user..mock';

interface Props {
  params: Promise<{ providerId: string }>;
}

export default async function BookingPage({ params }: Props) {
  const { providerId } = await params;
  console.log('providerId', providerId);

  return (
    <BookingFlow
      provider={provider}
      services={services}
      availability={availability}
      userId={user.id}
    />
  );
}
