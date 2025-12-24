import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import ProviderSettings from "@/components/provider/provider-settings";

export default async function ProviderSettingsPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login?type=provider");
  }

  const { data: provider } = await supabase
    .from("providers")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!provider) {
    redirect("/auth/sign-up?type=provider");
  }

  return (
    <ProviderSettings provider={provider} userId={user.id} />
  );
}
