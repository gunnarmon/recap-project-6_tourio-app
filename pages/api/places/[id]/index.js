import dbConnect from "@/db/connect.js";
import Places from "@/db/models/Places.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Places.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    try {
      const updatedPlace = request.body;
      await Places.findByIdAndUpdate(id, { $set: updatedPlace });
      response.status(200).json({ message: "updated successfully!" });
    } catch (error) {
      response
        .status(400)
        .json("Error: could not update", { error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Places.findByIdAndDelete(id);
      response.status(200).json({ message: "deleted successfully!" });
    } catch (error) {
      response
        .status(400)
        .json("Error: could not delete", { message: error.message });
    }
  }
}
