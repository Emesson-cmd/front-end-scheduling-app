export type Appointment = {
  id: number;
  services: {
    name: string;
    price: number;
  };
  providers: {
    business_name: string;
    address: string;
    city: string;
    phone: string;
  };
  status: AppointmentStatus;
  date: string;
  time: string;
  customers: {
    name: string;
    full_name: string;
  };
  appointment_date: string;
  appointment_time: string;
  created_at: string;
};

export type AppointmentStatus =
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'confirmed';
