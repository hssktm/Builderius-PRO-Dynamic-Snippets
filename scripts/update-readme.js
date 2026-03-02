const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const readmePath = path.join(root, "README.md");

// Find all snippet folders
const folders = fs.readdirSync(root).filter(folder => {
  const fullPath = path.join(root, folder);
  return (
    fs.statSync(fullPath).isDirectory() &&
    !folder.startsWith(".") &&
    fs.existsSync(path.join(fullPath, "snippet"))
  );
});

let tableRows = "";

// Loop through each folder to build table rows
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

  tableRows += `| \`${name}\` | ${description} |\n`;
});

// Read the current README
const original = fs.readFileSync(readmePath, "utf8");
const lines = original.split("\n");

// Find the index of the table header
const headerIndex = lines.findIndex(line => line.trim() === "| Snippet | Description |");
if (headerIndex === -1) {
  console.error("Table header not found in README.md");
  process.exit(1);
}

// Find where the table data ends (next empty line or next section)
let endIndex = headerIndex + 1;
while (endIndex < lines.length && lines[endIndex].trim().startsWith("|") && !lines[endIndex].startsWith("|---------")) {
  endIndex++;
}

// Build the new README
const beforeTable = lines.slice(0, headerIndex + 1).join("\n");
const afterTable = lines.slice(endIndex).join("\n");

// Add table separator and new rows
const updated = beforeTable + "\n|---------|-------------|\n" + tableRows + "\n" + afterTable;

// Save the updated README
fs.writeFileSync(readmePath, updated);
console.log("README updated successfully.");
