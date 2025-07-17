require("dotenv").config();
const express = require("express");
const cors = require("cors");
const calculatorRoutes = require("./routes/caculatorRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(express.json());

//Rota principal APi
app.use("/api", calculatorRoutes);

app.get("/", (req, res) => {
  res.send("API da calculadora no ar!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
