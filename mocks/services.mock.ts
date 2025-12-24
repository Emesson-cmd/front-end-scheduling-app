import { Service } from '@/models/service.model';

export const services: Service[] = [
  {
    id: '1',
    name: 'Service 1',
    price: 100,
    duration: 60,
    description: 'Service 1 description',
    duration_minutes: 60,
  },
  {
    id: '2',
    name: 'Service 2',
    price: 200,
    duration: 90,
    description: 'Service 2 description',
    duration_minutes: 90,
  },
];
