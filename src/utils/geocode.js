const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWRtZHRociIsImEiOiJja2xoMWlkM3IxZ2EzMnZuMXNndHBrZWp0In0.5tlbqi_-UDSg8ITa4fCLbQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("No matching result found!");
    } else {
      const data = body;
      const [long, lat] = data.features[0].center;
      callback(undefined, {
        longitude: long,
        latitude: lat,
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
