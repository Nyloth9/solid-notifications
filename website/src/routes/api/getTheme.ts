import type { APIEvent } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";

export async function GET() {
  return new Response(JSON.stringify({ theme: "dark" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
