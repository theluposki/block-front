const fs = require("fs");
const path = require("path");

// Modificado para o caminho dentro da pasta public
const versionFile = path.resolve(__dirname, "public", "version.json");

// 📌 Lê a versão atual do arquivo
const versionData = JSON.parse(fs.readFileSync(versionFile, "utf-8"));
let [major, minor, patch] = versionData.version.split(".").map(Number);

// 🔼 Incrementa a versão automaticamente
patch++; // Incrementa o último número (ex: 1.0.0 → 1.0.1)
const newVersion = `${major}.${minor}.${patch}`;

// 📌 Atualiza o arquivo `version.json`
fs.writeFileSync(versionFile, JSON.stringify({ version: newVersion }, null, 2));

console.log(`✅ Nova versão: ${newVersion}`);
