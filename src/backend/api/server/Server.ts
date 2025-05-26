import express from "express";

const server = express();

//configurações do servidor:
server.get("/", (req, res) => {
  return res.send("Olá, DEV!");
});

export { server };
