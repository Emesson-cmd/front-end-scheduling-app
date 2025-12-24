import ServiceBrowser from '@/components/customer/service-browser';
import { providers } from '@/mocks/provider.mock';

export default async function BrowseServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
          <p className="text-gray-600 mt-1">
            Browse and book services from local professionals
          </p>
        </div>
      </header>
      <ServiceBrowser providers={providers} />
    </div>
  );
}
