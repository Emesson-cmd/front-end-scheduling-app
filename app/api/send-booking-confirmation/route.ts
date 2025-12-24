import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send-email';
import { appointmentConfirmationTemplate, providerAppointmentTemplate } from '@/lib/email/templates';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { appointmentId } = await request.json();
    const supabase = await createClient();

    // Fetch appointment details
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select(`
        *,
        customers(full_name, email),
        providers(business_name, business_email, address, city, phone),
        services(name, price)
      `)
      .eq('id', appointmentId)
      .single();

    if (appointmentError || !appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    const dateStr = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const [hours, minutes] = appointment.appointment_time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeStr = `${displayHour}:${minutes} ${ampm}`;

    // Send confirmation to customer
    const customerHtml = appointmentConfirmationTemplate({
      customerName: appointment.customers.full_name,
      providerName: appointment.providers.business_name,
      serviceName: appointment.services.name,
      date: dateStr,
      time: timeStr,
      address: `${appointment.providers.address}, ${appointment.providers.city}`,
      price: `$${appointment.services.price}`,
    });

    await sendEmail({
      to: appointment.customers.email,
      subject: `Appointment Confirmed at ${appointment.providers.business_name}`,
      html: customerHtml,
    });

    // Send notification to provider
    const providerHtml = providerAppointmentTemplate({
      providerName: appointment.providers.business_name,
      customerName: appointment.customers.full_name,
      customerEmail: appointment.customers.email,
      customerPhone: appointment.customers.phone || 'N/A',
      serviceName: appointment.services.name,
      date: dateStr,
      time: timeStr,
      notes: appointment.notes || '',
    });

    await sendEmail({
      to: appointment.providers.business_email,
      subject: `New Appointment Booking - ${appointment.customers.full_name}`,
      html: providerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation' },
      { status: 500 }
    );
  }
}
