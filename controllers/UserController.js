const UserModel = require('../models/UserModel');
class UserControler {
    

    async listar(request,response){
        const id = request.params.id;
        let user   = await UserModel.findAll({where: {id:id}});
       
        return response.json(user);
    }

    async criar(request,response){
        const body= request.body;
        UserModel.create(body);
        return response.status(201).json({message: "Usuario cadastrado com sucesso"});
    }

    async atualizar(request,response){
        const id = request.params.id;
        const body= request.body;
        await UserModel.update(body,{where: {id}});
        return response.status(200).json({message: "usuario atualizado com sucesso"});

    }

    async deletar(request,response){
        const id = request.params.id;
        await UserModel.destroy({where: {id}});
        return response.status(200).json({message: "usuario deletado com sucesso"});
    }

}

module.exports = UserControler;