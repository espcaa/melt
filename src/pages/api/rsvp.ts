import type { APIRoute } from "astro";
import { turso } from "../../utils/db";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let email: string;
  try {
    const body = await request.json();
    email = body.email;
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  try {
    await turso.execute("INSERT INTO rsvps (email) VALUES (?)", [email]);
    return new Response("RSVP received", { status: 200 });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
