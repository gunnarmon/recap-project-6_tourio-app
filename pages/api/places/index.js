import dbConnect from "@/db/connect";
import Places from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Places.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Places.create(placeData);
      return response.status(201).json({ status: "Location created." });
    } catch (error) {
      response
        .status(400)
        .json("Error: Location could not be created", { error: error.message });
    }
  }
}
