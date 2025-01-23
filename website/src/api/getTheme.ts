import type { APIEvent } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";

export async function GET(event: APIEvent) {
  console.log("getTheme inside route", event);

  return {
    theme: "light",
  };
}
