const fs = require("fs");
const file =
  "E:/Al-Mamun/Fanam-Group-Corporate/fanam-group-corporate-server/src/models/Settings.js";
let content = fs.readFileSync(file, "utf8");

if (!content.includes("sitemap: [")) {
  const replacement = `      },
    },
    sitemap: [
      {
        title: String,
        items: [
          {
            name: String,
            href: String,
            icon: String,
          }
        ]
      }
    ]
  },
  { timestamps: true }`;

  content = content.replace(
    /      \},\s*\n\s*\},\s*\n\s*\},\s*\n\s*\{\s*timestamps:\s*true\s*\}/g,
    replacement,
  );
  fs.writeFileSync(file, content);
  console.log("Patched using regex");
} else {
  console.log("Already patched");
}
