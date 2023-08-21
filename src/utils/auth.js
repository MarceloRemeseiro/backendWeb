const bcrypt = require("bcrypt");

const users = [
  {
    username: "mediavdm@gmail.com",
    password: "Salmo150",
  },
  // ...other users
];
async function checkCredentials(username, password) {
  const user = users.find(user => user.username === username);
  if (!user) return false;
  return password === user.password;
}


module.exports = {
  checkCredentials,
};
