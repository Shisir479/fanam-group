const fs = require("fs");

// Patch 1: Add getSitemapSettings to controllers/user/settings.js
const userSettingsFile =
  "E:/Al-Mamun/Fanam-Group-Corporate/fanam-group-corporate-server/src/controllers/user/settings.js";
let userSettingsContent = fs.readFileSync(userSettingsFile, "utf8");
if (!userSettingsContent.includes("getSitemapSettings")) {
  const sitemapMethod = `
const getSitemapSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.sitemap) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json({ success: true, data: settings.sitemap });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
`;
  userSettingsContent = userSettingsContent.replace(
    "module.exports = {",
    sitemapMethod + "\nmodule.exports = {",
  );
  userSettingsContent = userSettingsContent.replace(
    "module.exports = {",
    "module.exports = {\n  getSitemapSettings,",
  );
  fs.writeFileSync(userSettingsFile, userSettingsContent);
}

// Patch 2: Add route to routes/user/settings.js
const userRoutesFile =
  "E:/Al-Mamun/Fanam-Group-Corporate/fanam-group-corporate-server/src/routes/user/settings.js";
let userRoutesContent = fs.readFileSync(userRoutesFile, "utf8");
if (!userRoutesContent.includes("/settings/sitemap")) {
  userRoutesContent = userRoutesContent.replace(
    "module.exports = router;",
    'router.get("/settings/sitemap", settings.getSitemapSettings);\n\nmodule.exports = router;',
  );
  fs.writeFileSync(userRoutesFile, userRoutesContent);
}

// Patch 3: Add admin get sitemap to controllers/admin/settings.js and route
const adminSettingsFile =
  "E:/Al-Mamun/Fanam-Group-Corporate/fanam-group-corporate-server/src/controllers/admin/settings.js";
let adminSettingsContent = fs.readFileSync(adminSettingsFile, "utf8");
if (!adminSettingsContent.includes("getSitemapSettings")) {
  const adminSitemapMethod = `
const getSitemapSettings = async (req, res) => {
  try {
    await getAdmin(req, res);
    const settings = await Settings.findOne();
    if (!settings || !settings.sitemap) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json({ success: true, data: settings.sitemap });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
`;
  adminSettingsContent = adminSettingsContent.replace(
    "module.exports = {",
    adminSitemapMethod + "\nmodule.exports = {",
  );
  adminSettingsContent = adminSettingsContent.replace(
    "module.exports = {",
    "module.exports = {\n  getSitemapSettings,",
  );
  fs.writeFileSync(adminSettingsFile, adminSettingsContent);
}

// Patch 4: Add admin route to routes/admin/settings.js
const adminRoutesFile =
  "E:/Al-Mamun/Fanam-Group-Corporate/fanam-group-corporate-server/src/routes/admin/settings.js";
let adminRoutesContent = fs.readFileSync(adminRoutesFile, "utf8");
if (!adminRoutesContent.includes("/admin/settings/sitemap")) {
  adminRoutesContent = adminRoutesContent.replace(
    "module.exports = router;",
    'router.get("/admin/settings/sitemap", verifyToken, settings.getSitemapSettings);\nrouter.put("/admin/settings/sitemap", verifyToken, settings.createSettings);\n\nmodule.exports = router;',
  );
  fs.writeFileSync(adminRoutesFile, adminRoutesContent);
}

console.log("Backend routes for Sitemap added successfully.");
