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

app.post("/api/register", (req, res, next) =>
  // res.json({elefant: true})

  bcrypt.hash(req.body.plainTxtPassword, saltRounds, function (err, hash) {
    console.log("backend", req.body.plainTxtPassword, " ", hash);

    res.json({ hash: hash });

    // Store hash in database
  })
);

app.post("/api/login", async (req, res) => {
  let hash = await User.findOne({ email: req.body.email }, {password: 1, _id:0})
  console.log("found hash ", hash.password)
  bcrypt.compare(req.body.password, hash.password, function (err, res) {
    if (res) {
      console.log("passwords match");
      // Passwords match
    } else {
      console.log("passwords don't match");
      // Passwords don't match
    }
  });
});
