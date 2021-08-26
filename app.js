const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
