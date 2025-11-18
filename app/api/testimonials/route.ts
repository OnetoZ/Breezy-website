import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  const db = await getDb()
  const testimonials = await db
    .collection("testimonials")
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json({ testimonials })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = await getDb()

  const newItem = {
    id: `testimonial-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...body,
  }

  await db.collection("testimonials").insertOne(newItem)

  return NextResponse.json({ testimonial: newItem }, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...data } = body
  const db = await getDb()

  const result = await db.collection("testimonials").findOneAndUpdate(
    { id },
    { $set: { ...data } },
    { returnDocument: "after" }
  )

  if (!result) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
  }

  return NextResponse.json({ testimonial: result })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const db = await getDb()
  const result = await db.collection("testimonials").deleteOne({ id })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
