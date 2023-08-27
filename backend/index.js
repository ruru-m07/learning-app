const connectToMongo = require("./db")
const express = require("express");
var cors = require('cors')

connectToMongo();
const app = express()
const port = 3005

app.use(cors())
app.use(express.json())
// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});