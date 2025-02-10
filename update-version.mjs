import fs from 'fs';
import path from 'path';

// Usando import.meta.url para obter o caminho do diretório
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
//
// Agora o caminho do version.json está correto
const versionFile = path.resolve(__dirname, 'public', 'version.json');

// 📌 Lê a versão atual do arquivo
const versionData = JSON.parse(fs.readFileSync(versionFile, 'utf-8'));
let [major, minor, patch] = versionData.version.split('.').map(Number);

// 🔼 Incrementa a versão automaticamente
patch++; // Incrementa o último número (ex: 1.0.0 → 1.0.1)
const newVersion = `${major}.${minor}.${patch}`;

// 📌 Atualiza o arquivo `version.json`
fs.writeFileSync(versionFile, JSON.stringify({ version: newVersion }, null, 2));

console.log(`✅ Nova versão: ${newVersion}`);
