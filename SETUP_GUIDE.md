# AyurSutra - Supabase & Gemini Integration Setup Guide

## Overview
Your AyurSutra application has been successfully integrated with:
- **Supabase**: For database management and user authentication
- **Gemini AI**: For AI-powered Ayurveda consultations and recommendations

## Setup Instructions

### 1. Supabase Setup

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to Settings > API
3. Copy your Project URL and anon public key

#### Set Up Database Schema
1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase_schema.sql` (found in project root)
3. Run the SQL to create all necessary tables and policies

#### Configure Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 2. Gemini API Setup

#### Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key for Gemini Pro
3. Copy the API key

#### Configure Environment Variable
1. In `.env.local`, add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key
```

### 3. Final Configuration

Your `.env.local` should look like this:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Enable Supabase Integration

Once you have configured the environment variables:

1. In `src/app/signup/patient/page.tsx`, uncomment lines 50-51:
```typescript
const patientData = convertFormDataToPatient(formData)
await AuthService.signUp(formData.email, 'temporary_password', patientData)
```

2. Add a password field to your signup form for proper authentication

## Features Implemented

### 🗄️ Database Features
- Complete patient data management
- Event/appointment scheduling
- AI consultation history
- Treatment plan tracking
- Progress monitoring

### 🤖 AI Features
- Personalized Ayurveda consultations using Gemini AI
- Treatment plan generation
- Dietary recommendations
- Symptom analysis with dosha assessment

### 🔐 Security Features
- Row Level Security (RLS) policies
- User authentication with Supabase Auth
- API key protection (server-side only)

## New Pages & Features

### AI Consultation (`/consultation`)
- Describe symptoms and get AI-powered Ayurveda recommendations
- Personalized advice based on user profile
- Professional disclaimers and safety warnings

### Enhanced Dashboard
- New "AI Consultation" navigation item
- Real-time data from Supabase (when configured)

### Calendar Integration
- Events stored in Supabase
- Appointment management
- Treatment scheduling

## Development Notes

### Current State
- Application works with localStorage as fallback
- Full Supabase integration ready (requires environment variables)
- Gemini AI consultation ready (requires API key)

### Next Steps
1. Configure environment variables
2. Test Supabase connection
3. Test Gemini AI consultation
4. Add user authentication flow
5. Implement practitioner features

## Testing

### Test AI Consultation
1. Complete patient signup
2. Navigate to AI Consultation
3. Describe symptoms
4. Verify AI response quality

### Test Database Integration
1. Configure Supabase credentials
2. Enable Supabase code in signup
3. Test patient registration
4. Verify data in Supabase dashboard

## Support

If you encounter any issues:
1. Check environment variables are correctly set
2. Verify Supabase project is active
3. Confirm Gemini API key has quota
4. Check browser console for errors

## Security Notes

- Never commit `.env.local` to version control
- API keys should only be used server-side
- Supabase RLS policies protect user data
- Always validate user input before AI processing