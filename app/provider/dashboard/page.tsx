import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import ProviderDashboard from "@/components/provider/provider-dashboard";

export default async function ProviderDashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login?type=provider");
  }

  // Fetch provider data
  const { data: provider, error: providerError } = await supabase
    .from("providers")
    .select("*")
    .eq("id", user.id)
    .single();

  if (providerError || !provider) {
    redirect("/auth/sign-up?type=provider");
  }

  // Fetch provider's services
  const { data: services = [] } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", user.id);

  // Fetch upcoming appointments
  const { data: appointments = [] } = await supabase
    .from("appointments")
    .select(`
      *,
      customers(full_name, email, phone),
      services(name, duration_minutes, price)
    `)
    .eq("provider_id", user.id)
    .eq("status", "confirmed")
    .order("appointment_date", { ascending: true })
    .limit(5);

  return (
    <ProviderDashboard 
      provider={provider} 
      services={services} 
      appointments={appointments}
      userId={user.id}
    />
  );
}
