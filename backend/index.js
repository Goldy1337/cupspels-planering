const dbName = 'cupdb'
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { mongoose, express, app } = require('mongoosy')({
  // settings for mongoosy
  connect: {
    url: 'mongodb://localhost/' + dbName
  }
});

app.listen(3001, () => console.log('API server listening on port 3001'));

app.post("/api/register", (req, res, next) => 
  // res.json({elefant: true})
  
  
  bcrypt.hash(req.body.unEncPassword, saltRounds, function (err, hash) {
    console.log("backend", req.body.unEncPassword, " ", hash)
    
 res.json({hash: hash})

    // Store hash in database
    
  })
);