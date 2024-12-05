const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class UserRepository {
  async getAllUsers() {
    const { data, error } = await supabase.from('user').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * @param {Object} user - Dados do usuário a ser criado.
   */
  async createUser(user) {
    const { data, error } = await supabase.from('user').insert([{
      name: user.name,
      email: user.email
    }]);
    if (error) {
      console.error('Erro ao inserir usuário:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  /**
   * @param {string} email 
   * @returns {Object|null} 
   */
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single(); 

    if (error) {
      if (error.code === 'PGRST116') return null; 
      console.error('Erro ao buscar usuário por email:', error.message);
      throw new Error(error.message);
    }

    return data;
  }

  async updateUser(id, updates) {
    const { data, error } = await supabase
      .from('user')
      .update(updates) 
      .match({ id }) 
      .single(); 

    if (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error(error.message);
    }

    return data;
  }

  async deleteUser(id) {
    const { data, error } = await supabase
      .from('user')
      .delete()
      .match({ id }); 

    if (error) {
      console.error('Erro ao deletar usuário:', error.message);
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = UserRepository;
