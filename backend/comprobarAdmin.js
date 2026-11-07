require("dotenv").config();

const hash = process.env.ADMIN_PASSWORD_HASH || "";

console.log("¿Usuario admin configurado?:", process.env.ADMIN_USERNAME === "admin");
console.log("¿Hash encontrado?:", hash.length > 0);
console.log("Longitud del hash:", hash.length);
console.log("¿Tiene formato bcrypt?:", hash.startsWith("$2"));
console.log("¿JWT configurado?:", Boolean(process.env.JWT_SECRET));