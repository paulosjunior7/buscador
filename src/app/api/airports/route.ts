import data from "./data.json";

export async function GET(request: Request) {
  return Response.json(data["response-airports"]);
}
