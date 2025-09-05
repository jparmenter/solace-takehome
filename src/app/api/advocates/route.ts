import { ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const data = await db.select().from(advocates).where(
    or(
      ilike(advocates.firstName, `%${query}%`),
      ilike(advocates.lastName, `%${query}%`),
      ilike(advocates.city, `%${query}%`),
      ilike(advocates.degree, `%${query}%`),
      // // ilike(advocates.specialties, `%${query}%`),
        ilike(sql`advocates.years_of_experience::text`, `%${query}%`),
        ilike(sql`advocates.phone_number::text`, `%${query}%`)
    )
  );

  return Response.json({ data });
}
