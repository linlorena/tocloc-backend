const express = require('express');
const UserService = require('../services/UserService');
const router = express.Router();
const userService = new UserService();
const authentication = require('../middleware/authentication.midle');

router.get('/', authentication, async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("Dados recebidos na rota:", req.body); 
  const { name, email } = req.body;

  if (!name || !email) {
    console.error("Dados inválidos:", { name, email });
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }
  
  try {
    const newUser = await userService.registerUser({ name, email });
    res.status(201).json({ message: "Usuário criado com sucesso!", newUser });
  } catch (err) {
    console.error("Erro na criação do usuário:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "Pelo menos um campo (name ou email) deve ser fornecido para atualização." });
    }

    const updatedUser = await userService.updateUser(req.params.id, updatedData);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário: ' + err.message });
  }
});

module.exports = router;
