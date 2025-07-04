import { NextResponse } from "next/server"
import { getRecentActivity } from "@/lib/db-utils"

export async function GET() {
  try {
    const activities = await getRecentActivity()
    return NextResponse.json(activities)
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
