import { createClient } from "@/lib/supabase/server";
import ServiceBrowser from "@/components/customer/service-browser";

export default async function BrowseServicesPage() {
  const supabase = await createClient();

  // Fetch all providers with their services
  const { data: providers = [] } = await supabase
    .from("providers")
    .select(`
      *,
      services(*)
    `);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
          <p className="text-gray-600 mt-1">Browse and book services from local professionals</p>
        </div>
      </header>
      <ServiceBrowser providers={providers} />
    </div>
  );
}
