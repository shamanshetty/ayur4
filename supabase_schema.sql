-- AyurSutra Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Patients table
CREATE TABLE patients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    country VARCHAR(100),
    gender VARCHAR(20),
    prior_panchakarma_experience BOOLEAN,

    -- Additional details
    dietary_habits TEXT,
    shared_calendar BOOLEAN DEFAULT false,
    content_preferences TEXT[], -- Array of strings
    activity_level VARCHAR(20) DEFAULT 'moderate',
    health_goals TEXT[], -- Array of strings
    chronic_conditions TEXT[], -- Array of strings
    current_medications TEXT[], -- Array of strings
    stress_anxiety BOOLEAN DEFAULT false,
    physical_symptoms BOOLEAN DEFAULT false,
    panchakarma_expectations TEXT[], -- Array of strings
    consent_share BOOLEAN DEFAULT false,
    agree_terms BOOLEAN DEFAULT false,

    -- For experienced users
    previous_therapies TEXT[], -- Array of strings
    previous_benefits TEXT[], -- Array of strings
    side_effects TEXT,
    follow_instructions TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events/Appointments table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    type VARCHAR(50) DEFAULT 'consultation', -- meeting, treatment, call, consultation
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE consultations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    practitioner_id UUID, -- For future practitioner integration
    symptoms TEXT NOT NULL,
    ai_recommendations TEXT,
    prescribed_treatments TEXT[],
    follow_up_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Treatment Plans table
CREATE TABLE treatment_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    plan_name VARCHAR(255) NOT NULL,
    description TEXT,
    ai_generated_plan TEXT,
    duration_weeks INTEGER,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, paused
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Tracking table
CREATE TABLE progress_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    treatment_plan_id UUID REFERENCES treatment_plans(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    symptoms_rating INTEGER CHECK (symptoms_rating >= 1 AND symptoms_rating <= 10),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
    stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practitioners table (for future use)
CREATE TABLE practitioners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    specialization TEXT[],
    experience_years INTEGER,
    license_number VARCHAR(100),
    bio TEXT,
    consultation_fee DECIMAL(10, 2),
    availability_schedule JSONB, -- Store weekly schedule
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_events_patient_id ON events(patient_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_treatment_plans_patient_id ON treatment_plans(patient_id);
CREATE INDEX idx_progress_tracking_patient_id ON progress_tracking(patient_id);
CREATE INDEX idx_progress_tracking_date ON progress_tracking(date);

-- Row Level Security (RLS) policies
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;

-- Patients can only access their own data
CREATE POLICY "Patients can view own data" ON patients FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Patients can update own data" ON patients FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Patients can insert own data" ON patients FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Events policies
CREATE POLICY "Patients can view own events" ON events FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can insert own events" ON events FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can update own events" ON events FOR UPDATE USING (auth.uid()::text = patient_id::text);

-- Consultations policies
CREATE POLICY "Patients can view own consultations" ON consultations FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can insert own consultations" ON consultations FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Treatment plans policies
CREATE POLICY "Patients can view own treatment plans" ON treatment_plans FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can insert own treatment plans" ON treatment_plans FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Progress tracking policies
CREATE POLICY "Patients can view own progress" ON progress_tracking FOR SELECT USING (auth.uid()::text = patient_id::text);
CREATE POLICY "Patients can insert own progress" ON progress_tracking FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treatment_plans_updated_at BEFORE UPDATE ON treatment_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();