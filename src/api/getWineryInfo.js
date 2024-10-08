const fetch = require("node-fetch");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

module.exports = async (req, res) => {
  console.log("API route hit", req.query); // Log incoming request

  const { wineryName } = req.query;

  if (!wineryName) {
    console.log("No winery name provided");
    return res.status(400).json({ error: "Winery name is required" });
  }

  try {
    console.log("Fetching place ID for:", wineryName);
    // First, we need to get the place ID
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        wineryName,
      )}&inputtype=textquery&fields=place_id&key=${API_KEY}`,
    );
    const searchData = await searchResponse.json();
    console.log("Place ID search result:", searchData);

    if (searchData.candidates && searchData.candidates.length > 0) {
      const placeId = searchData.candidates[0].place_id;
      console.log("Place ID found:", placeId);

      // Then, we can get the details using the place ID
      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,rating,review,website&key=${API_KEY}`,
      );
      const detailsData = await detailsResponse.json();
      console.log("Winery details fetched:", detailsData);

      res.status(200).json(detailsData.result);
    } else {
      console.log("Winery not found");
      res.status(404).json({ error: "Winery not found" });
    }
  } catch (error) {
    console.error("Error fetching winery info:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching winery information" });
  }
};
