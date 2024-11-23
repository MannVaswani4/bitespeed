const express = require("express");
const bodyParser = require("body-parser");
const identifyRoute = require("./routes/identify");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/", identifyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
