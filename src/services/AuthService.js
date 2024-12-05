const bcrypt = require('bcrypt');
const UserRepository = require("../repositories/UserRepository");
const jwt = require('jsonwebtoken');

class AuthService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async loginUser(userData) {
        const { email, senha } = userData;

        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('E-mail não encontrado.');
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return token;
    }
}

module.exports = AuthService;
