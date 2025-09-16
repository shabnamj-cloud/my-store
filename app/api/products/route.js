import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || searchParams.get("query") || "";
    const category = searchParams.get("category") || "";

    let filter = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ name: regex }, { brand: regex }];
    }

    if (category) {
      const regex = new RegExp(category, "i");
      filter.category = regex;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    console.log(`📦 ${products.length} products fetched with filter`, filter);

    return NextResponse.json(products);
  } catch (err) {
    console.error("❌ Error in GET /api/products:", err);
    return NextResponse.json([], { status: 500 });
  }
}
