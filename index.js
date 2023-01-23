const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
var cors = require("cors");
app.use(cors());
const path = require("path");

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use("/api/auth", require("./routes/auth"));
app.use("/api/passwords", require("./routes/passwords"));

// if (process.env.NODE_ENV == "production") {
  
  
//   app.use(express.static("frontend/build"));
// }
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));

//   const path = require("path");

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => {
  // console.log(`Password Manager listening on port ${port}`);
});
