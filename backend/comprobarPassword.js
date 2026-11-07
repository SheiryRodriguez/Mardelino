require("dotenv").config();

const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Escribe la contraseña que estás usando: ", async (password) => {
  const coincide = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  console.log(
    coincide
      ? "RESULTADO: La contraseña coincide con el hash."
      : "RESULTADO: La contraseña NO coincide con el hash."
  );

  rl.close();
});