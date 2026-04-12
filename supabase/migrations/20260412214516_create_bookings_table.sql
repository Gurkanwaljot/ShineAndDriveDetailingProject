/*
  # Create bookings table

  ## Summary
  Creates a bookings table to store car detailing appointment requests submitted
  through the custom booking form on the website.

  ## New Tables

  ### bookings
  Stores all appointment booking requests with the following columns:

  - `id` (uuid, primary key) — unique identifier
  - `created_at` (timestamptz) — when the booking was submitted
  - `appointment_date` (date) — requested appointment date
  - `appointment_time` (text) — requested time slot (e.g. "10:00 AM")
  - `vehicle_type` (text) — Car, SUV, Truck, or Van
  - `service_type` (text) — Interior, Exterior, or Full Service
  - `vehicle_make` (text) — e.g. Toyota
  - `vehicle_model` (text) — e.g. Camry
  - `package_name` (text) — selected package name
  - `package_category` (text) — parent category name
  - `add_ons` (text[]) — array of selected add-on names
  - `water_access` (boolean) — whether customer has water access
  - `power_access` (boolean) — whether customer has power access
  - `special_instructions` (text) — optional notes
  - `customer_name` (text) — full name
  - `customer_phone` (text) — phone number
  - `customer_email` (text) — email address
  - `customer_address` (text) — service location address
  - `status` (text) — booking status: pending, confirmed, completed, cancelled

  ## Security
  - RLS enabled: anonymous users can INSERT (public booking form)
  - No SELECT for anonymous users (admin-only reads)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  vehicle_type text NOT NULL,
  service_type text NOT NULL,
  vehicle_make text NOT NULL DEFAULT '',
  vehicle_model text NOT NULL DEFAULT '',
  package_name text NOT NULL DEFAULT '',
  package_category text NOT NULL DEFAULT '',
  add_ons text[] DEFAULT '{}',
  water_access boolean DEFAULT false,
  power_access boolean DEFAULT false,
  special_instructions text DEFAULT '',
  customer_name text NOT NULL DEFAULT '',
  customer_phone text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  customer_address text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update booking status"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
