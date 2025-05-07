import { NextResponse } from "next/server";
import airports from "@/app/data/airports.json";

export async function GET() {
  return NextResponse.json(airports);
}
