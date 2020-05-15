const bcrypt = require("bcrypt");
const router = express.Router
const saltRounds = 10;

var user = require('./models/User')

//test get api
app.get('/api/users', (req, res) => {

  let res = await user.find()
  res = await res.json()
});

//api för registrering
app.post("/auth/register", (req, res, next) => {
  console.log('backend')
  bcrypt.hash(req.body.password, req.body.salt, function (err, hash) {
    console.log("hash ", hash)
    // Store hash in database
  });

  });

  // bcrypt.compare(req.body.password, hash, function (err, res) {
  //   if (res) {
  //     console.log("passwords match")
  //     // Passwords match
  //   } else {
  //     console.log("passwords don't match")
  //     // Passwords don't match
  //   }
  // });


module.exports = app; 
