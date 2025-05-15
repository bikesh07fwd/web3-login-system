const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.SECRET_TOKEN;

app.post("/auth", async (req, res) => {
  const { address, message, signature } = req.body;
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token });
    }
    return res.status(401).json({ error: "Signature mismatch" });
  } catch (e) {
    return res.status(500).json({ error: "Auth failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
