import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "@/components/admin/admin-dashboard";

// Simple admin check - in production, use proper role-based access
const ADMIN_EMAILS = ['admin@servicebook.com'];

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login");
  }

  // Check if user is admin (basic check)
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    redirect("/");
  }

  // Fetch platform statistics
  const { data: providers = [] } = await supabase
    .from("providers")
    .select("id");

  const { data: customers = [] } = await supabase
    .from("customers")
    .select("id");

  const { data: appointments = [] } = await supabase
    .from("appointments")
    .select("status");

  const { data: recentAppointments = [] } = await supabase
    .from("appointments")
    .select(`
      *,
      customers(full_name),
      providers(business_name),
      services(name, price)
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  const stats = {
    totalProviders: providers.length,
    totalCustomers: customers.length,
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter((a) => a.status === "confirmed").length,
    completedAppointments: appointments.filter((a) => a.status === "completed").length,
    revenue: appointments.reduce((sum, a) => {
      // Calculate from services - simplified
      return sum;
    }, 0),
  };

  return (
    <AdminDashboard stats={stats} recentAppointments={recentAppointments} />
  );
}
