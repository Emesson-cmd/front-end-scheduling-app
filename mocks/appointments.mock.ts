import { Appointment } from '@/models/appointment.model';

export const appointments: Appointment[] = [
  {
    id: 1,
    services: { name: 'Service 1', price: 100 },
    providers: {
      business_name: 'Provider 1',
      address: '123 Main St',
      city: 'City 1',
      phone: '123-456-7890',
    },
    status: 'confirmed',
    date: '2023-09-01',
    time: '10:00 AM',
    customers: { name: 'John Doe', full_name: 'John Doe' },
    appointment_date: '2023-09-01',
    appointment_time: '10:00 AM',
    created_at: '2023-09-01T10:00:00.000Z',
  },
  {
    id: 2,
    services: { name: 'Service 2', price: 200 },
    providers: {
      business_name: 'Provider 2',
      address: '456 Main St',
      city: 'City 2',
      phone: '987-654-3210',
    },
    status: 'pending',
    date: '2023-09-02',
    time: '11:00 AM',
    customers: { name: 'Jane Smith', full_name: 'Jane Smith' },
    appointment_date: '2023-09-02',
    appointment_time: '11:00 AM',
    created_at: '2023-09-02T11:00:00.000Z',
  },
  {
    id: 3,
    services: { name: 'Service 3', price: 150 },
    providers: {
      business_name: 'Provider 3',
      address: '789 Main St',
      city: 'City 3',
      phone: '555-555-5555',
    },
    status: 'completed',
    date: '2023-09-03',
    time: '12:00 PM',
    customers: { name: 'Bob Johnson', full_name: 'Bob Johnson' },
    appointment_date: '2023-09-03',
    appointment_time: '12:00 PM',
    created_at: '2023-09-03T12:00:00.000Z',
  },
  {
    id: 4,
    services: { name: 'Service 4', price: 75 },
    providers: {
      business_name: 'Provider 4',
      address: '321 Main St',
      city: 'City 4',
      phone: '777-777-7777',
    },
    status: 'cancelled',
    date: '2023-09-04',
    time: '1:00 PM',
    customers: { name: 'Alice Williams', full_name: 'Alice Williams' },
    appointment_date: '2023-09-04',
    appointment_time: '1:00 PM',
    created_at: '2023-09-04T13:00:00.000Z',
  },
];

export const recentAppointments = appointments.slice(0, 3);
