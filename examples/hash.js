const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash('ourPasswordhere', salt)
    console.log(salt)
    console.log(hashedPwd)
}

run();