const dbName = "cupdb";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { mongoose, express, app } = require("mongoosy")({
  // settings for mongoosy
  connect: {
    url: "mongodb://localhost/" + dbName,
  },
});
const User = require('./models/User')

app.listen(3001, () => console.log("API server listening on port 3001"));

// app.get(
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1IjoiZGNiZXJnbWFuIiwiYSI6ImNrYTN5c3V5azAya2wzZWxibXduam51bW4ifQ.4YmXwdarg4cIyPVYT9IiVQ",
//   async (req, res) => {
//     res.json(await Cat.find());
//   }
// );
