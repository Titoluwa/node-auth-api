const bcrypt = require('bcryptjs');

async function run(password){
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);
}