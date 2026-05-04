const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/crear", (req, res) => {
  res.json({ ok: true });
});

app.post("/validar", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});
