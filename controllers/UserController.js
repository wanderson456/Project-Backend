const UserModel = require('../models/UserModel');
const MD5 = require('crypto-js/md5');
class UserControler {


    async listartodos(request,response){
        const id = request.params.id;
        let user   = await UserModel.findAll();
       
        return response.json(user);
    }
    

    async listar(request,response){
        const id = request.params.id;
        if (!id) {
            return response.status(400).json({ message: "ID não fornecido" });
        }
        try {
            let user = await UserModel.findOne({ where: { id } });
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
            return response.json({
                id:user.id,
                firstname: user.firstname,
                surname: user.surname,
                email: user.email,
                
             


            }
            );
        } catch (error) {
            return response.status(500).json({ message: "Erro ao listar usuário", error });
        }
    }

    async criar(request, response) {
        const { firstname, surname, email, password, confirmPassword } = request.body;

        
        if (!firstname || !surname || !email || !password || !confirmPassword) {
            return response.status(400).json({ message: "Dados incompletos. Todos os campos são obrigatórios." });
        }

        
        if (password !== confirmPassword) {
            return response.status(400).json({ message: "As senhas não correspondem." });
        }

      
           

        

        try {
            const existingUser = await UserModel.findOne({ where: { email } });
            if (existingUser) {
                return response.status(400).json({ message: "E-mail já cadastrado." });
            }
            const hashedPassword = MD5(password).toString();

            
            const newUser = await UserModel.create({
                firstname,
                surname,
                email,
                password: hashedPassword
            });

            
            return response.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
        
            return response.status(500).json({ message: "Erro ao cadastrar usuário", error });
        }
    }


    async atualizar(request, response) {
        const id = request.params.id;
        const { firstname, surname, email, password } = request.body;

        
        if (!firstname || !surname || !email || !password) {
            return response.status(400).json({ message: "Dados incompletos. Todos os campos são obrigatórios." });
        }

        try {
            
            const user = await UserModel.findOne({ where: { id } });
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado." });
            }

            
            const existingUser = await UserModel.findOne({ where: { email, id: { email, id } } });
            if (existingUser) {
                return response.status(400).json({ message: "E-mail já está em uso por outro usuário." });
            }

            
            await UserModel.update(
                { firstname, surname, email },
                { where: { id } }
            );

            
            return response.status(204).send();
        } catch (error) {
        
            return response.status(500).json({ message: "Erro ao atualizar usuário", error });
        }
    }

    async deletar(request, response) {
        const id = request.params.id;

    
        try {
            
            const user = await UserModel.findOne({ where: { id } });
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado." });
            }

            await UserModel.destroy({ where: { id } });

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ message: "Erro ao deletar usuário", error });
        }
    }
}

module.exports = UserControler;