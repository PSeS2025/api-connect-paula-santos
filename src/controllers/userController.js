import { users, generateId } from '../data/userData.js';

// GET /usuarios (com filtro por query params se fornecidos)
/**
 * Controller responsável por buscar um único usuário pelo ID.
 * Extrai o identificador da URL via parâmetros de rota (req.params).
 * 
 * @route GET /usuarios/:id
 * @returns {object} Status 200 (OK) com o objeto do usuário OU Status 404 (Not Found) se não existir.
 */
export const getUsers = (req, res) => {
    const { name, email, age } = req.query;

    let result = users;

    if (name || email || age) {
        result = users.filter((user) => {
            return (
                (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
                (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
                (!age || String(user.age) === String(age))
            );
        });
    }

    return res.status(200).json(result);
};

// POST /usuarios
/**
 * Controller responsável por cadastrar um novo usuário.
 * 
 * @route POST /usuarios
 * @returns {object} Status 201 (Created) e o registro criado.
 */
export const createUser = (req, res) => {
    const { name, age, email } = req.body;

    // 1. Validação do Nome
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'O campo "name" é obrigatório e deve ser uma string válida.'
        });
    }

    // 2. Validação do E-mail (Retorna o erro 400 se o e-mail faltar ou não tiver @)
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({
            error: 'O campo "email" é obrigatório e deve ser um e-mail válido.'
        });
    }

    // 3. Se passou pelas validações, cria o usuário
    const newUser = {
        id: generateId(),
        name: name.trim(),
        age: age !== undefined ? Number(age) : null,
        email: email.trim().toLowerCase()
    };

    users.push(newUser);

    // 4. Retorno de sucesso com envelope
    return res.status(201).json({
        message: 'Usuário cadastrado com sucesso.',
        data: newUser
    });
};

/**
 * Controller responsável por buscar um único usuário pelo ID.
 * Extrai o identificador da URL via parâmetros de rota (req.params).
 * 
 * @route GET /usuarios/:id
 * @returns {object} Status 200 (OK) com o objeto do usuário OU Status 404 (Not Found) se não existir.
 */
export const getUserById = (req, res) => {
    const { id } = req.params;

    // Busca do usuário na estrutura de persistência em memória
    const user = users.find((u) => u.id === id);

    // Tratamento de resiliência: se o ID não existir, retorna status 404
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorno gracioso com status 200 e os dados do registro encontrado
    return res.status(200).json(user);
};

// PUT /usuarios/:id
/**
 * Controller responsável por atualizar dados de um usuário existente.
 * Localiza o índice do usuário pelo parâmetro :id, trata 404 se ausente
 * e sobrescreve as informações com os dados enviados no corpo da requisição (req.body).
 * 
 * @route PUT /usuarios/:id
 * @returns {object} Status 200 (OK) com o registro atualizado OU Status 404 se inexistente.
 */
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;

    // Localiza a posição/índice do registro no array
    const userIndex = users.findIndex((user) => user.id === id);

    // Tratamento de resiliência: registro não encontrado
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualização preservando o ID original e permitindo atualização parcial
    users[userIndex] = {
        ...users[userIndex],
        name: name !== undefined ? name : users[userIndex].name,
        age: age !== undefined ? age : users[userIndex].age,
        email: email !== undefined ? email : users[userIndex].email
    };

    // Retorno com status 200 (OK) e o objeto atualizado
    return res.status(200).json(users[userIndex]);
};

// DELETE /usuarios/:id
/**
 * Controller responsável pela exclusão de um usuário.
 * Localiza o índice do usuário pelo parâmetro :id, trata 404 se ausente
 * e remove o registro do array em memória utilizando o método splice.
 * 
 * @route DELETE /usuarios/:id
 * @returns {object} Status 200 (OK) com mensagem de sucesso OU Status 404 se inexistente.
 */
export const deleteUser = (req, res) => {
    const { id } = req.params;

    // Localiza a posição/índice do registro no array
    const userIndex = users.findIndex((user) => user.id === id);

    // Tratamento de resiliência: registro não encontrado
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Remoção de 1 elemento a partir da posição encontrada
    users.splice(userIndex, 1);

    // Retorno com status 200 (OK) e confirmação de exclusão
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
};