const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=baa75a5e0f393d580abd138fc149572a&query=${long},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]} .It's currently ${data.temperature} degrees out, it feels like ${data.feelslike} degrees out. The humidity is ${data.humidity}.`
      );
    }
  });
};

module.exports = forecast;
