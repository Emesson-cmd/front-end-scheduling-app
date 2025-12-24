import { createClient } from "@/lib/supabase/server";
import CustomerAppointments from "@/components/customer/customer-appointments";
import { redirect } from 'next/navigation';

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login?type=customer");
  }

  const { data: appointments = [] } = await supabase
    .from("appointments")
    .select(`
      *,
      providers(business_name, phone, address, city),
      services(name, duration_minutes, price)
    `)
    .eq("customer_id", user.id)
    .order("appointment_date", { ascending: true });

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
