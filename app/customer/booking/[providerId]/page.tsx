import { createClient } from "@/lib/supabase/server";
import BookingFlow from "@/components/customer/booking-flow";
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ providerId: string }>;
}

export default async function BookingPage({ params }: Props) {
  const { providerId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login?type=customer");
  }

  // Fetch provider details
  const { data: provider, error: providerError } = await supabase
    .from("providers")
    .select("*")
    .eq("id", providerId)
    .single();

  if (providerError || !provider) {
    redirect("/customer/browse");
  }

  // Fetch provider's services
  const { data: services = [] } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", providerId);

  // Fetch provider's availability
  const { data: availability = [] } = await supabase
    .from("availability")
    .select("*")
    .eq("provider_id", providerId);

  return (
    <BookingFlow
      provider={provider}
      services={services}
      availability={availability}
      userId={user.id}
    />
  );
}
