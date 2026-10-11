
const next = require("next");
const http = require("http");

const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    http.createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`Next.js server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
