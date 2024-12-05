const UserRepository = require('../repositories/UserRepository');
const md5 = require('md5');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async listUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      throw new Error('Erro ao listar usuários');
    }
  }

  /**
   * @param {Object} user - Dados do usuário (name, email).
   */
  async registerUser(user) {
    const { name, email, password } = user;
    console.log("Dados recebidos no serviço:", { name, email, password });

    if (!name || !email || !password) {
      throw new Error('Nome, email e senha são obrigatórios.');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('O e-mail fornecido é inválido.');
    }

    const encryptedPassword = this.encryptPassword(password);

    try {
      return await this.userRepository.createUser({ name, email, password: encryptedPassword });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      throw new Error('Erro ao registrar usuário');
    }
  }

  async updateUser(id, updates) {
    if (!id) {
      throw new Error("O ID do usuário é obrigatório.");
    }

    if (updates.password) {
      updates.password = this.encryptPassword(updates.password);
    }

    try {
      return await this.userRepository.updateUser(id, updates);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("O ID do usuário é obrigatório.");
    }

    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      throw new Error('Erro ao deletar usuário');
    }
  }

  encryptPassword(password) {
    return md5(password);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = UserService;
