// Production server - simplified version that just uses the built dist/index.js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import and run the built server
const serverPath = path.join(__dirname, "..", "dist", "index.js");
import(serverPath).catch(console.error);