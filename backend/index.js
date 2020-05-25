const dbName = 'cupdb'
const serverPort = 3001;
const path = require('path');
const { mongoose, express, app, pwencrypt } = require('mongoosy')({
  // settings for mongoosy
  connect: {
    url: 'mongodb://localhost/' + dbName
  },
  login: {
    encryptionSalt: 'Det coolaste saltet från den coola gruppen',
  },
  // acl: {
  //   query: aclSecurity
  // }
});
 
app.listen(serverPort, () => console.log('Server listening on port ' + serverPort));
 
function aclSecurity({ user, model, instance, methods }) {

  // an array of methods names (skipping the argument to methods)
  let methodNames = methods.map(x => x.method);

  return false ||
    // SuperAdmins can do anything
    (user && user.role.includes('SuperAdmin')) ||
    // Refereess can find and sort Users
    (
      user &&
      user.role.includes('Referee') &&
      model === 'User' &&
      methodNames.filter(x => !['find', 'sort'].includes(x)).length === 0
    ) ||
    // Admins can save Users
    (
      user &&
      user.role.includes('Admin') &&
      model === 'User' &&
      methodNames.filter(x => !['save'].includes(x)).length === 0
    );
}
 
const User = require('./models/User')
async function createUsers() {
  let god = await User.findOne({ email: 'god@gmail.com' });
  if (god) { return; }
  god = new User({
    name: 'Godly Admin',
    role: 'SuperAdmin',
    email: 'god@gmail.com',
    phoneNumber: 0404040404,
    password: pwencrypt('666'),
    colorMode: 'dark'
  });
  await god.save();
  console.log(god);

  let admin = await User.findOne({ email: 'admin@gmail.com' });
  if (admin) { return; }
  admin = new User({
    name: 'Test Admin',
    role: 'Admin',
    email: 'admin@gmail.com',
    phoneNumber: 0405050505,
    password: pwencrypt('100'),
    colorMode: 'light'
  });
  await admin.save();
  console.log(admin);

  let referee = await User.findOne({ email: 'ref@gmail.com' });
  if (referee) { return; }
  referee = new User({
    name: 'Test Referee',
    role: 'Referee',
    email: 'ref@gmail.com',
    phoneNumber: 0401010101,
    password: pwencrypt('200'),
    colorMode: 'light'
  })
  await referee.save();
  console.log(referee)
}

createUsers();