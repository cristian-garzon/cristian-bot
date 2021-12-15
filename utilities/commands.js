const fs = require('fs')
const commandfiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
module.exports = {
    Commands : commandfiles
}