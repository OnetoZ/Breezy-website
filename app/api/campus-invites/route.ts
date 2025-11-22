import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

const COLLECTION = "campus_invites"

export async function GET() {
  const db = await getDb()
  const invites = await db.collection(COLLECTION).find().sort({ createdAt: -1 }).toArray()

  return NextResponse.json({ invites })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const requiredFields = ["campusName", "cityState", "contactName", "contactEmail", "contactPhone"]

  for (const field of requiredFields) {
    if (!body[field] || !String(body[field]).trim()) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 })
    }
  }

  const invite = {
    id: `campus-invite-${Date.now()}`,
    createdAt: new Date().toISOString(),
    campusName: body.campusName.trim(),
    cityState: body.cityState.trim(),
    contactName: body.contactName.trim(),
    contactRole: (body.contactRole || "").trim(),
    contactEmail: body.contactEmail.trim(),
    contactPhone: body.contactPhone.trim(),
    preferredMonth: (body.preferredMonth || "").trim(),
    campusNote: (body.campusNote || "").trim(),
  }

  const db = await getDb()
  await db.collection(COLLECTION).insertOne(invite)

  return NextResponse.json({ invite }, { status: 201 })
}

