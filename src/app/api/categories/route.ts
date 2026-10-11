import { NextResponse } from "next/server";
import { getCategories } from "@/lib/products";
export async function GET() { return NextResponse.json(await getCategories()); }
