import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  const db = await getDb()
  const enquiries = await db
    .collection("retailers")
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json({ enquiries })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = await getDb()

  const enquiry = {
    id: `retailer-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...body,
  }

  await db.collection("retailers").insertOne(enquiry)

  return NextResponse.json({ enquiry }, { status: 201 })
}
