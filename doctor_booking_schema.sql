-- Enhanced Doctor Search & Appointment Booking Schema
-- Run this in your Supabase SQL editor after the main schema

-- Enhanced Practitioners table (updating existing)
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS years_of_experience INTEGER;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS education TEXT[];
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS clinic_name VARCHAR(255);
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS online_consultation BOOLEAN DEFAULT false;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS in_person_consultation BOOLEAN DEFAULT true;
ALTER TABLE practitioners ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Specializations lookup table
CREATE TABLE IF NOT EXISTS specializations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor specializations mapping
CREATE TABLE IF NOT EXISTS doctor_specializations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    specialization_id UUID REFERENCES specializations(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(practitioner_id, specialization_id)
);

-- Consultation types and pricing
CREATE TABLE IF NOT EXISTS consultation_types (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'online', 'in_person', 'follow_up'
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor availability patterns
CREATE TABLE IF NOT EXISTS doctor_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    consultation_type_id UUID REFERENCES consultation_types(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specific time slots (for exceptions and bookings)
CREATE TABLE IF NOT EXISTS appointment_slots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    consultation_type_id UUID REFERENCES consultation_types(id),
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    is_blocked BOOLEAN DEFAULT false, -- Doctor blocked this slot
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced appointments table
ALTER TABLE events ADD COLUMN IF NOT EXISTS practitioner_id UUID REFERENCES practitioners(id);
ALTER TABLE events ADD COLUMN IF NOT EXISTS consultation_type_id UUID REFERENCES consultation_types(id);
ALTER TABLE events ADD COLUMN IF NOT EXISTS appointment_slot_id UUID REFERENCES appointment_slots(id);
ALTER TABLE events ADD COLUMN IF NOT EXISTS booking_notes TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS patient_phone VARCHAR(20);
ALTER TABLE events ADD COLUMN IF NOT EXISTS meeting_link TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE events ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE events ADD COLUMN IF NOT EXISTS consultation_notes TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS prescription TEXT;

-- Doctor reviews and ratings
CREATE TABLE IF NOT EXISTS doctor_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES events(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false, -- Verified actual patient
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor certifications and achievements
CREATE TABLE IF NOT EXISTS doctor_certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    certification_name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    verification_status VARCHAR(20) DEFAULT 'pending',
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default specializations
INSERT INTO specializations (name, description, icon_name) VALUES
('Panchakarma Specialist', 'Expert in traditional detoxification and rejuvenation therapies', 'spa'),
('Ayurvedic Physician', 'General Ayurvedic medicine and lifestyle counseling', 'medical'),
('Pulse Diagnosis Expert', 'Specialized in Nadi Pariksha (pulse diagnosis)', 'heartbeat'),
('Herbal Medicine Specialist', 'Expert in medicinal plants and herbal formulations', 'leaf'),
('Yoga Therapist', 'Therapeutic yoga and meditation practices', 'meditation'),
('Ayurvedic Nutrition', 'Dietary therapy and nutritional counseling', 'nutrition'),
('Women''s Health', 'Ayurvedic treatments for women''s health issues', 'female'),
('Pediatric Ayurveda', 'Ayurvedic care for children and infants', 'child'),
('Mental Wellness', 'Ayurvedic approach to mental health and stress management', 'brain'),
('Skin & Beauty Care', 'Natural skincare and beauty treatments', 'skincare'),
('Joint & Bone Health', 'Treatments for arthritis, joint pain, and bone health', 'bone'),
('Digestive Health', 'Specialized treatments for digestive disorders', 'stomach')
ON CONFLICT (name) DO NOTHING;

-- Insert sample consultation types for testing
INSERT INTO consultation_types (practitioner_id, type, duration_minutes, price, description)
SELECT
    id as practitioner_id,
    'online' as type,
    45 as duration_minutes,
    1500.00 as price,
    'Online video consultation with detailed health assessment' as description
FROM practitioners
LIMIT 1;

INSERT INTO consultation_types (practitioner_id, type, duration_minutes, price, description)
SELECT
    id as practitioner_id,
    'in_person' as type,
    60 as duration_minutes,
    2000.00 as price,
    'In-person consultation with physical examination' as description
FROM practitioners
LIMIT 1;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_practitioners_city ON practitioners(city);
CREATE INDEX IF NOT EXISTS idx_practitioners_rating ON practitioners(rating DESC);
CREATE INDEX IF NOT EXISTS idx_practitioners_verified ON practitioners(verified);
CREATE INDEX IF NOT EXISTS idx_doctor_specializations_practitioner ON doctor_specializations(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_practitioner ON doctor_availability(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_appointment_slots_date ON appointment_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_appointment_slots_practitioner ON appointment_slots(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reviews_practitioner ON doctor_reviews(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reviews_rating ON doctor_reviews(rating);

-- Function to update practitioner rating when review is added
CREATE OR REPLACE FUNCTION update_practitioner_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE practitioners
    SET
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM doctor_reviews
            WHERE practitioner_id = NEW.practitioner_id
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM doctor_reviews
            WHERE practitioner_id = NEW.practitioner_id
        )
    WHERE id = NEW.practitioner_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update ratings
DROP TRIGGER IF EXISTS trigger_update_practitioner_rating ON doctor_reviews;
CREATE TRIGGER trigger_update_practitioner_rating
    AFTER INSERT OR UPDATE OR DELETE ON doctor_reviews
    FOR EACH ROW EXECUTE FUNCTION update_practitioner_rating();

-- Enhanced RLS policies
ALTER TABLE doctor_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_certifications ENABLE ROW LEVEL SECURITY;

-- Public read access for finding doctors
CREATE POLICY "Public can view practitioners" ON practitioners FOR SELECT USING (true);
CREATE POLICY "Public can view specializations" ON specializations FOR SELECT USING (true);
CREATE POLICY "Public can view doctor specializations" ON doctor_specializations FOR SELECT USING (true);
CREATE POLICY "Public can view consultation types" ON consultation_types FOR SELECT USING (true);
CREATE POLICY "Public can view availability" ON doctor_availability FOR SELECT USING (true);
CREATE POLICY "Public can view appointment slots" ON appointment_slots FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON doctor_reviews FOR SELECT USING (true);

-- Doctors can manage their own data
CREATE POLICY "Doctors can manage own profile" ON practitioners FOR ALL USING (auth.uid()::text = id::text);
CREATE POLICY "Doctors can manage own specializations" ON doctor_specializations FOR ALL USING (auth.uid()::text = practitioner_id::text);
CREATE POLICY "Doctors can manage own consultation types" ON consultation_types FOR ALL USING (auth.uid()::text = practitioner_id::text);
CREATE POLICY "Doctors can manage own availability" ON doctor_availability FOR ALL USING (auth.uid()::text = practitioner_id::text);
CREATE POLICY "Doctors can manage own slots" ON appointment_slots FOR ALL USING (auth.uid()::text = practitioner_id::text);
CREATE POLICY "Doctors can view own reviews" ON doctor_reviews FOR SELECT USING (auth.uid()::text = practitioner_id::text);

-- Patients can create reviews and book appointments
CREATE POLICY "Patients can create reviews" ON doctor_reviews FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can update own reviews" ON doctor_reviews FOR UPDATE USING (auth.uid()::text = patient_id::text);

-- Sample data for testing
INSERT INTO practitioners (id, email, first_name, last_name, specialization, experience_years, bio, consultation_fee, city, state, location, verified, rating, total_reviews)
VALUES
    (uuid_generate_v4(), 'dr.sharma@ayursutra.com', 'Rajesh', 'Sharma', ARRAY['Panchakarma Specialist'], 15, 'Dr. Rajesh Sharma is a renowned Panchakarma specialist with over 15 years of experience in traditional Ayurvedic treatments. He has helped thousands of patients achieve optimal health through personalized detoxification programs.', 2000.00, 'Mumbai', 'Maharashtra', 'Andheri West, Mumbai', true, 4.8, 127),
    (uuid_generate_v4(), 'dr.priya@ayursutra.com', 'Priya', 'Patel', ARRAY['Women''s Health', 'Ayurvedic Physician'], 12, 'Dr. Priya Patel specializes in women''s health and reproductive wellness through Ayurveda. She combines traditional wisdom with modern understanding to provide comprehensive care for women of all ages.', 1800.00, 'Bangalore', 'Karnataka', 'Koramangala, Bangalore', true, 4.9, 89),
    (uuid_generate_v4(), 'dr.kumar@ayursutra.com', 'Amit', 'Kumar', ARRAY['Digestive Health', 'Pulse Diagnosis Expert'], 18, 'Dr. Amit Kumar is an expert in digestive health and pulse diagnosis. His unique approach combines traditional Nadi Pariksha with modern diagnostic techniques to provide accurate health assessments.', 1500.00, 'Delhi', 'Delhi', 'Lajpat Nagar, New Delhi', true, 4.7, 156)
ON CONFLICT DO NOTHING;