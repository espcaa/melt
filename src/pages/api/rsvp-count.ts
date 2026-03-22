import type { APIRoute } from "astro";
import { turso } from "../../utils/db";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const result = await turso.execute("SELECT COUNT(*) FROM rsvps");
    const count = result.rows[0][0] as number;
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching RSVP count:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
