import { NextRequest, NextResponse } from 'next/server'
import { getAyurvedaConsultation, getTreatmentPlan, getDietaryAdvice } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { type, patientData, symptoms } = await request.json()

    if (!patientData) {
      return NextResponse.json(
        { error: 'Patient data is required' },
        { status: 400 }
      )
    }

    let result = ''

    switch (type) {
      case 'consultation':
        if (!symptoms) {
          return NextResponse.json(
            { error: 'Symptoms are required for consultation' },
            { status: 400 }
          )
        }
        result = await getAyurvedaConsultation(patientData, symptoms)
        break

      case 'treatment-plan':
        result = await getTreatmentPlan(patientData)
        break

      case 'dietary-advice':
        result = await getDietaryAdvice(patientData)
        break

      default:
        return NextResponse.json(
          { error: 'Invalid consultation type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ result })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI consultation' },
      { status: 500 }
    )
  }
}