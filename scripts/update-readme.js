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

    // Extract name from # name: marker
    const nameMatch = content.match(/^#\s*name:\s*(.+)$/m);
    if (nameMatch) name = nameMatch[1].trim();

    // Extract description from # desc: marker
    const descMatch = content.match(/^#\s*desc:\s*(.+)$/m);
    if (descMatch) description = descMatch[1].trim();
  }

  tableRows += `| \`${name}\` | ${description} |\n`;
});

// Read the current README
const original = fs.readFileSync(readmePath, "utf8");

// Identify start and end of the table
const tableHeader = "| Snippet | Description |";
const tableStart = original.indexOf(tableHeader);
const tableEnd = original.indexOf("More snippet types (layouts, CSS) coming soon.");

if (tableStart === -1 || tableEnd === -1) {
  console.error("Table markers not found in README.md");
  process.exit(1);
}

// Preserve content before and after the table
const beforeTable = original.substring(0, tableStart + tableHeader.length) + "\n";
const afterTable = original.substring(tableEnd);

// Build the new README content
const updated = beforeTable + tableRows + afterTable;

// Save the updated README
fs.writeFileSync(readmePath, updated);
console.log("README updated successfully.");
