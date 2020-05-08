const dbName = 'cupdb'
// const { mongoose, express, app } = require('mongoosy')({
//   // settings for mongoosy
//   connect: {
//     url: 'mongodb://localhost/' + dbName
//   }
// });

// app.listen(3001, () => console.log('API server listening on port 3001'));

const path = require('path');
const { mongoose, express, app, pwencrypt } = require('mongoosy')({
  // settings for mongoosy
  connect: {
    url: 'mongodb://localhost/' + dbName
  },
  acl: {
    query: aclQuery,
    result: aclResult
  }
});
 
app.listen(3001, () => console.log('Server listening on port 3001'));
app.use(express.static('models')); //TODO, stämmer detta? Ska det vara index eller annat i scr?
app.get('/frontend', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend.js')));
 
function aclQuery({ user, model, instance, methods }) {
  // blacklisting is safest 
  // - i.e.return false unless you want to allow something
  console.log('aclQuery', JSON.stringify(arguments, '', '  '));
  return true ||
    (user && user.roles.includes('god')) ||
    (user && user.roles.includes('catwatcher') && methods[0].method === 'find' && methods.length === 1) ||
    (user && user.roles.includes('catcreator') && methods[0].method === 'save' && methods.length === 1);
}
 
function aclResult({ user, model, instance, methods, result }) {
  // can modify results
  console.log('aclResult', JSON.stringify(arguments, '', '  '));
  if (!user || !user.roles.includes('god') && model === 'Cat' && result instanceof Array) {
    console.log('You are not a god so no Garfield for you!');
    result = result.filter(x => x.name !== 'Garfield');
  }
  return result;
}
 
async function createGodUser() {
  let User = require('./models/User');
  let foundGod = await User.findOne({ email: 'god@gmail.com' });
  if (foundGod) { return; }
  let god = new User({ name: 'godlyAdmin', role: 'SuperAdmin', email: 'god@gmail.com', phoneNumber: 123, password: pwencrypt('666'), salt: 'fasuhwbafka' });
  console.log('Created god user...');
  console.log(User);
  console.log(foundGod);
  await god.save();
}
 
createGodUser();