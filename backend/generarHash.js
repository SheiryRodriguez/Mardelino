const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Escribe tu nueva contraseña de administradora: ", (password) => {
  const hash = bcrypt.hashSync(password, 12);
  console.log("\nTu contraseña protegida es:\n");
  console.log(hash);
  rl.close();
});