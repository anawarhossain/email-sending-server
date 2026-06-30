const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/email-send", (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send("Email sent successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
