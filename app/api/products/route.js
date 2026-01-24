import Papa from "papaparse";

export async function GET() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv",
    { next: { revalidate: 300 } } // cache 5 min
  );

  const csv = await res.text();
  const data = Papa.parse(csv, { header: true }).data;

  const validProducts = data.filter(p => p?.Name && p?.Category);

  return Response.json(validProducts);
}
