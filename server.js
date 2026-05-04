const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const DB = "db.json";

function load(){
  try {
    if(!fs.existsSync(DB)) return {};
    return JSON.parse(fs.readFileSync(DB));
  } catch {
    return {};
  }
}

function save(data){
  try {
    fs.writeFileSync(DB, JSON.stringify(data,null,2));
  } catch {}
}

app.get("/", (req,res)=>{
  res.status(200).send("OK");
});

app.post("/crear",(req,res)=>{
  const { key, dias } = req.body || {};

  if(!key){
    return res.status(400).json({ ok:false });
  }

  const db = load();

  db[key] = {
    fecha: Date.now(),
    dias: dias || 30
  };

  save(db);

  res.json({ ok:true });
});

app.post("/validar",(req,res)=>{
  const { key } = req.body || {};

  const db = load();

  if(!db[key]){
    return res.json({ ok:false });
  }

  const lic = db[key];

  const ahora = Date.now();
  const expira = lic.fecha + (lic.dias * 86400000);

  if(ahora > expira){
    return res.json({ ok:false });
  }

  res.json({
    ok:true,
    dias: Math.floor((expira - ahora)/86400000)
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Servidor corriendo en puerto " + PORT);
});
