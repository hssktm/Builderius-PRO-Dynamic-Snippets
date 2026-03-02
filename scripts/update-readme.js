const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const readmePath = path.join(root, "README.md");

// Detectar carpetas con snippet
const folders = fs.readdirSync(root).filter(folder => {
  const fullPath = path.join(root, folder);
  return (
    fs.statSync(fullPath).isDirectory() &&
    !folder.startsWith(".") &&
    fs.existsSync(path.join(fullPath, "snippet"))
  );
});

let table = `### GraphQL Data Variables

| Snippet | Description |
|---------|-------------|
`;

folders.sort().forEach(folder => {
  const snippetPath = path.join(root, folder, "snippet");
  let name = folder;
  let description = "No description";

  if (fs.existsSync(snippetPath)) {
    const content = fs.readFileSync(snippetPath, "utf8");

    const nameMatch = content.match(/^#\s*name:\s*(.+)$/m);
    if (nameMatch) name = nameMatch[1].trim();

    const descMatch = content.match(/^#\s*desc:\s*(.+)$/m);
    if (descMatch) description = descMatch[1].trim();
  }

  table += `| \`${name}\` | ${description} |\n`;
});

// Leer README principal
const original = fs.readFileSync(readmePath, "utf8");

const start = original.indexOf("### GraphQL Data Variables");
const end = original.indexOf("More snippet types");

if (start === -1 || end === -1) {
  console.log("Markers not found in README.md");
  process.exit(1);
}

const before = original.substring(0, start);
const after = original.substring(end);

const updated = before + table + "\n" + after;

fs.writeFileSync(readmePath, updated);
console.log("README updated successfully.");
