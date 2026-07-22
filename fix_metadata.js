const fs = require("fs");

// Fix about page
let about = fs.readFileSync("src/app/about/page.tsx", "utf8");
about = about.replace(
  /return constructMetadata\(\{([\s\S]*?)\n  \};\n\}/g,
  "return constructMetadata({\n$1\n  });\n}",
);
fs.writeFileSync("src/app/about/page.tsx", about);

// Fix projects/[slug]/page.tsx
let projectSlug = fs.readFileSync("src/app/projects/[slug]/page.tsx", "utf8");
projectSlug = projectSlug.replace(
  /return constructMetadata\(\{([\s\S]*?)\n  \};\n\}/g,
  "return constructMetadata({\n$1\n  });\n}",
);
fs.writeFileSync("src/app/projects/[slug]/page.tsx", projectSlug);

// Fix blog/[slug]/page.tsx
let blogSlug = fs.readFileSync("src/app/blog/[slug]/page.tsx", "utf8");
blogSlug = blogSlug.replace(
  /return constructMetadata\(\{([\s\S]*?)\n  \};\n\}/g,
  "return constructMetadata({\n$1\n  });\n}",
);
fs.writeFileSync("src/app/blog/[slug]/page.tsx", blogSlug);

// Convert privacy-policy
let privacy = fs.readFileSync("src/app/legal/privacy-policy/page.tsx", "utf8");
if (privacy.includes("export const metadata =")) {
  privacy = privacy.replace(/export const metadata.*?;[\n\r]*/, "");
  privacy = privacy.replace(
    "export default async function PrivacyPolicyPage() {",
    `export async function generateMetadata() {
  let pageData = null;
  try {
    const res = await getPageBySlugPublic("privacy-policy");
    if (res?.success) pageData = res.data;
  } catch (e) {}
  
  return constructMetadata({
    title: pageData?.metaTitle || "Privacy Policy - Bonedi Homes",
    description: pageData?.metaDescription || "Privacy Policy for Bonedi Homes"
  });
}

export default async function PrivacyPolicyPage() {`,
  );
  fs.writeFileSync("src/app/legal/privacy-policy/page.tsx", privacy);
}

// Convert terms-conditions
let terms = fs.readFileSync("src/app/legal/terms-conditions/page.tsx", "utf8");
if (terms.includes("export const metadata =")) {
  terms = terms.replace(/export const metadata.*?;[\n\r]*/, "");
  terms = terms.replace(
    "export default async function TermsConditionsPage() {",
    `export async function generateMetadata() {
  let pageData = null;
  try {
    const res = await getPageBySlugPublic("terms-conditions");
    if (res?.success) pageData = res.data;
  } catch (e) {}
  
  return constructMetadata({
    title: pageData?.metaTitle || "Terms & Conditions - Bonedi Homes",
    description: pageData?.metaDescription || "Terms & Conditions for Bonedi Homes"
  });
}

export default async function TermsConditionsPage() {`,
  );
  fs.writeFileSync("src/app/legal/terms-conditions/page.tsx", terms);
}

console.log("Fixed syntax and updated legal pages to dynamic metadata.");
