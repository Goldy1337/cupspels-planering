const dbName = "cupdb";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { mongoose, express, app } = require("mongoosy")({
  // settings for mongoosy
  connect: {
    url: "mongodb://localhost/" + dbName,
  },
});
const User = require("./models/User");
const Address = require("./models/Address");

app.listen(3001, () => console.log("API server listening on port 3001"));

// app.get("/api/v1/locations", (req, res) => {
//   res.send("map api");
// });
// app.post("/api/v1/locations", (req, res) => {
//   try {
//     const location = Address.create(req.body);
//     return res.status(200).json({
//       success: true,
//       data: location
//     })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({error: 'server error'});
  // }
// });
