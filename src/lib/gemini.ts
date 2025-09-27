import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" })

// Ayurveda-specific prompts and functions
export const ayurvedaPrompts = {
  consultation: `You are an experienced Ayurvedic practitioner with deep knowledge of traditional Indian medicine, Panchakarma, and holistic wellness. Based on the patient's symptoms, health goals, and constitution, provide personalized recommendations following these guidelines:

1. Analyze the symptoms from an Ayurvedic perspective (Vata, Pitta, Kapha doshas)
2. Suggest appropriate Panchakarma treatments if applicable
3. Recommend dietary modifications based on Ayurvedic principles
4. Suggest lifestyle changes and daily routines (Dinacharya)
5. Provide herbal remedies or preparations if suitable
6. Always emphasize the importance of consulting with a qualified Ayurvedic practitioner

Please structure your response with clear sections and practical advice.`,

  treatmentPlan: `Create a personalized Panchakarma treatment plan based on the patient's profile. Consider their dosha constitution, health goals, activity level, and any chronic conditions. Include:

1. Preparatory phase (Purvakarma)
2. Main treatment phase (Panchakarma procedures)
3. Post-treatment care (Paschatkarma)
4. Timeline and frequency
5. Dietary guidelines throughout the treatment
6. Lifestyle modifications

Ensure all recommendations are safe and emphasize professional supervision.`,

  dietaryAdvice: `Provide Ayurvedic dietary recommendations based on the patient's constitution, health goals, and current conditions. Include:

1. Foods to favor and avoid
2. Eating habits and timing
3. Seasonal considerations
4. Specific recipes or preparations
5. Spices and herbs to include
6. Hydration guidelines

Focus on practical, achievable dietary changes that align with Ayurvedic principles.`
}

export async function getAyurvedaConsultation(patientData: any, symptoms: string) {
  try {
    const prompt = `${ayurvedaPrompts.consultation}

Patient Information:
- Age: ${calculateAge(patientData.dateOfBirth)}
- Gender: ${patientData.gender}
- Activity Level: ${patientData.activityLevel}
- Health Goals: ${patientData.healthGoals.join(', ')}
- Chronic Conditions: ${patientData.chronicConditions.join(', ')}
- Current Medications: ${patientData.currentMedications.join(', ')}
- Prior Panchakarma Experience: ${patientData.priorPanchakarmaExperience ? 'Yes' : 'No'}
- Dietary Habits: ${patientData.dietaryHabits}

Current Symptoms/Concerns:
${symptoms}

Please provide a comprehensive Ayurvedic consultation and recommendations.`

    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Error getting Ayurveda consultation:', error)
    throw new Error('Failed to get AI consultation')
  }
}

export async function getTreatmentPlan(patientData: any) {
  try {
    const prompt = `${ayurvedaPrompts.treatmentPlan}

Patient Profile:
- Age: ${calculateAge(patientData.dateOfBirth)}
- Gender: ${patientData.gender}
- Activity Level: ${patientData.activityLevel}
- Health Goals: ${patientData.healthGoals.join(', ')}
- Chronic Conditions: ${patientData.chronicConditions.join(', ')}
- Dietary Habits: ${patientData.dietaryHabits}
- Prior Experience: ${patientData.priorPanchakarmaExperience ? 'Yes' : 'No'}
- Expectations: ${patientData.panchkarmaExpectations.join(', ')}

Please create a personalized Panchakarma treatment plan.`

    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Error getting treatment plan:', error)
    throw new Error('Failed to generate treatment plan')
  }
}

export async function getDietaryAdvice(patientData: any) {
  try {
    const prompt = `${ayurvedaPrompts.dietaryAdvice}

Patient Information:
- Age: ${calculateAge(patientData.dateOfBirth)}
- Gender: ${patientData.gender}
- Activity Level: ${patientData.activityLevel}
- Health Goals: ${patientData.healthGoals.join(', ')}
- Current Dietary Habits: ${patientData.dietaryHabits}
- Chronic Conditions: ${patientData.chronicConditions.join(', ')}

Please provide personalized Ayurvedic dietary recommendations.`

    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Error getting dietary advice:', error)
    throw new Error('Failed to get dietary advice')
  }
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}