import { Provider } from '@/models/provider.model';

export const provider: Provider = {
  id: '123',
  business_name: 'Provider Name',
  address: '123 Main St',
  city: 'City',
  state: 'State',
  zip_code: '12345',
  phone: '123-456-7890',
};

export const providers: Provider[] = [
  {
    id: '1',
    business_name: 'Provider 1',
    address: '123 Main St',
    city: 'City 1',
    state: 'State 1',
    zip_code: '12345',
    phone: '123-456-7890',
  },
  {
    id: '2',
    business_name: 'Provider 2',
    address: '456 Main St',
    city: 'City 2',
    state: 'State 2',
    zip_code: '67890',
    phone: '987-654-3210',
  },
];
