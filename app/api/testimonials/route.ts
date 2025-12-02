import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import crypto from "crypto"

export async function GET() {
  const db = await getDb()
  const testimonials = await db
    .collection("testimonials")
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  // Do not expose edit tokens in list responses
  const safe = testimonials.map((t) => {
    const { editToken, ...rest } = t as any
    return rest
  })

  return NextResponse.json({ testimonials: safe })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = await getDb()
  const editToken = crypto.randomUUID()

  const newItem = {
    id: `testimonial-${Date.now()}`,
    createdAt: new Date().toISOString(),
    editToken,
    ...body,
  }

  await db.collection("testimonials").insertOne(newItem)

  // return the edit token so the client can store it (used to authorize edits/deletes)
  return NextResponse.json({ testimonial: newItem }, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, editToken, ...data } = body
  if (!id || !editToken) {
    return NextResponse.json({ error: "Missing id or edit token" }, { status: 400 })
  }

  const db = await getDb()

  const result = await db.collection("testimonials").findOneAndUpdate(
    { id, editToken },
    { $set: { ...data } },
    { returnDocument: "after" }
  )

  // Mongo driver's findOneAndUpdate returns an object with `value`
  const updated = (result && (result as any).value) || null

  if (!updated) {
    return NextResponse.json({ error: "Testimonial not found or unauthorized" }, { status: 404 })
  }

  // Do not return the editToken in subsequent reads for safety (but it's stored in DB)
  return NextResponse.json({ testimonial: updated })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  const token = searchParams.get("token")

  if (!id || !token) {
    return NextResponse.json({ error: "Missing id or token" }, { status: 400 })
  }

  const db = await getDb()
  const result = await db.collection("testimonials").deleteOne({ id, editToken: token })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Testimonial not found or unauthorized" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
