import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  const db = await getDb()
  const orders = await db
    .collection("orders")
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json({ orders })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const db = await getDb()

  const newOrder = {
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "received",
    ...body,
  }

  await db.collection("orders").insertOne(newOrder)

  return NextResponse.json({ order: newOrder }, { status: 201 })
}
