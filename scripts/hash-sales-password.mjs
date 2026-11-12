import crypto from "node:crypto";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { hashPassword } from "../lib/auth/password.js";

async function main() {
  const args = process.argv.slice(2);
  const rl = readline.createInterface({ input, output });

  try {
    const username =
      args[0] || (await rl.question("Username (e.g. sales1): ")).trim();
    const email =
      args[1] ||
      (await rl.question("Email (e.g. sales@healthfirstmed.in): ")).trim();
    const name =
      args[2] || (await rl.question("Display name (e.g. Sales Team): ")).trim();
    const password = args[3] || (await rl.question("Password: "));

    if (!username && !email) {
      console.error("Error: Provide at least a username or email.");
      process.exitCode = 1;
      return;
    }

    if (!password || password.length < 10) {
      console.error("Error: Password must be at least 10 characters long.");
      process.exitCode = 1;
      return;
    }

    const passwordHash = await hashPassword(password);
    const secret = crypto.randomBytes(32).toString("hex");
    const account = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      name: name || username || email,
      passwordHash,
      disabled: false,
      tokenVersion: 1,
    };

    const usersJson = JSON.stringify([account]);
    const usersBase64 = Buffer.from(usersJson, "utf8").toString("base64");

    console.log("\nGenerated password hash:");
    console.log(passwordHash);
    console.log("\nSuggested SALES_AUTH_SECRET (keep private):");
    console.log(`SALES_AUTH_SECRET=${secret}`);
    console.log("\nOption A - JSON format:");
    console.log(`SALES_AUTH_USERS='${usersJson}'`);
    console.log("\nOption B - Base64 format (recommended for Vercel / Windows):");
    console.log(`SALES_AUTH_USERS=${usersBase64}`);
  } finally {
    rl.close();
  }
}

main();

