const fs = require("fs");
const path = require("path");
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith("page.tsx")) results.push(file);
    }
  });
  return results;
}
const files = walk("src/app");
files.forEach((f) => {
  const content = fs.readFileSync(f, "utf8");
  if (
    content.includes("export const metadata") ||
    content.includes("export async function generateMetadata")
  ) {
    if (f.includes("layout.tsx")) return;

    // Replace logic
    let newContent = content;

    // Add import if not present
    if (!newContent.includes("constructMetadata")) {
      newContent =
        'import { constructMetadata } from "@/lib/metadata";\n' + newContent;
    }

    if (f.includes("admin")) {
      newContent = newContent.replace(
        /export const metadata(?:.*?)=(?:[\s\S]*?\}|.*);/,
        'export const metadata = constructMetadata({ title: "Admin Dashboard", noIndex: true });',
      );
    } else {
      if (newContent.includes("export const metadata")) {
        const titleMatch = newContent.match(/title:\s*["'](.*?)["']/);
        const descMatch = newContent.match(/description:\s*["'](.*?)["']/);

        let args = [];
        if (titleMatch) args.push(`title: "${titleMatch[1]}"`);
        if (descMatch) args.push(`description: "${descMatch[1]}"`);

        newContent = newContent.replace(
          /export const metadata(?:.*?)=(?:[\s\S]*?\}|.*);/,
          `export const metadata = constructMetadata({ ${args.join(", ")} });`,
        );
      } else if (
        newContent.includes("export async function generateMetadata")
      ) {
        // Dynamic metadata using constructMetadata
        // Replace return { title: ... } with return constructMetadata({ title: ... })
        newContent = newContent.replace(
          /return\s*\{([\s\S]*?)\}/,
          "return constructMetadata({$1})",
        );
      }
    }

    // Remove Metadata type import if it's no longer used
    if (
      newContent.includes('import { Metadata } from "next";') ||
      newContent.includes('import type { Metadata } from "next";')
    ) {
      newContent = newContent.replace(
        /import (?:type )?\{ Metadata \} from ["']next["'];\n?/,
        "",
      );
    }

    if (newContent !== content) {
      fs.writeFileSync(f, newContent);
      console.log("Updated", f);
    }
  }
});
