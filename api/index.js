import app from "./src/main.js";

app.listen(process.env.APP_PORT, () => {
  console.info(`process started on port ${process.env.APP_PORT}`);
});
