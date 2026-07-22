const fs = require("fs");
const path = require("path");
const dir = "e:/Al-Mamun/bonedi/bonedi_client/src/services";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let changed = false;

  // 1. Replace revalidateGlobalCache with revalidatePage
  if (content.includes("revalidateGlobalCache")) {
    content = content.replace(/revalidateGlobalCache/g, "revalidatePage");
    content = content.replace(
      /revalidatePage\([\"'].*?[\"']\)/g,
      'revalidatePage("/", "layout")',
    );
    changed = true;
  }

  // 2. Add revalidatePage to files that do POST/PUT/DELETE but don't have it
  const regex =
    /export const (\w+) = async \((.*?)\) => \{\s*return await api\((.*?)\);\s*\};/g;
  if (regex.test(content) && content.includes("method:")) {
    content = content.replace(regex, (match, name, args, apiCall) => {
      if (
        apiCall.includes('"POST"') ||
        apiCall.includes('"PUT"') ||
        apiCall.includes('"DELETE"')
      ) {
        changed = true;
        return `export const ${name} = async (${args}) => {\n  const res = await api(${apiCall});\n  await revalidatePage("/", "layout");\n  return res;\n};`;
      }
      return match;
    });
  }

  if (changed) {
    if (!content.includes("revalidatePage")) {
      content = 'import { revalidatePage } from "@/app/actions";\n' + content;
    } else if (!content.includes("import { revalidatePage }")) {
      if (content.includes("import { revalidateGlobalCache }")) {
        content = content.replace(
          'import { revalidateGlobalCache } from "@/app/actions";',
          'import { revalidatePage } from "@/app/actions";',
        );
      } else {
        content = 'import { revalidatePage } from "@/app/actions";\n' + content;
      }
    }
    fs.writeFileSync(filePath, content);
    console.log("Updated " + file);
  }
});
