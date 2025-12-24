-- Create providers (service professionals) table
CREATE TABLE providers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create availability/working hours table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers profile table
CREATE TABLE customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Providers RLS Policies
CREATE POLICY "Providers can view their own profile"
  ON providers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Providers can update their own profile"
  ON providers FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view provider profiles"
  ON providers FOR SELECT
  USING (TRUE);

-- Services RLS Policies
CREATE POLICY "Providers can manage their services"
  ON services FOR SELECT
  USING (provider_id = auth.uid() OR TRUE);

CREATE POLICY "Providers can insert services"
  ON services FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their services"
  ON services FOR UPDATE
  USING (auth.uid() = provider_id);

CREATE POLICY "Providers can delete their services"
  ON services FOR DELETE
  USING (auth.uid() = provider_id);

-- Availability RLS Policies
CREATE POLICY "Providers can manage availability"
  ON availability FOR SELECT
  USING (provider_id = auth.uid() OR TRUE);

CREATE POLICY "Providers can insert availability"
  ON availability FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update availability"
  ON availability FOR UPDATE
  USING (auth.uid() = provider_id);

CREATE POLICY "Providers can delete availability"
  ON availability FOR DELETE
  USING (auth.uid() = provider_id);

-- Appointments RLS Policies
CREATE POLICY "Customers can view their appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Providers can view their appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = provider_id);

CREATE POLICY "Customers can insert appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update their appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = customer_id);

CREATE POLICY "Customers can delete their appointments"
  ON appointments FOR DELETE
  USING (auth.uid() = customer_id);

CREATE POLICY "Providers can update appointment status"
  ON appointments FOR UPDATE
  USING (auth.uid() = provider_id);

-- Customers RLS Policies
CREATE POLICY "Customers can view their own profile"
  ON customers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Customers can update their own profile"
  ON customers FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Customers can insert their profile"
  ON customers FOR INSERT
  WITH CHECK (auth.uid() = id);
