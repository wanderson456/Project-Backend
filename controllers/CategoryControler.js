const CategoryModel = require('../models/CategoryModel');
class CategoryControler {
    

    async listar(request,response){
        const id = request.params.id;
        let user   = await CategoryModel.findAll({where: {id:id}});
       
        return response.json(user);
    }

    async criar(request,response){
        const body= request.body;
        CategoryModel.create(body);
        return response.status(201).json({message: "Categoria cadastrada com sucesso"});
    }

    async atualizar(request,response){
        const id = request.params.id;
        const body= request.body;
        await CategoryModel.update(body,{where: {id}});
        return response.status(200).json({message: "Categoria atualizada com sucesso"});

    }

    async deletar(request,response){
        const id = request.params.id;
        await CategoryModel.destroy({where: {id}});
        return response.status(200).json({message: "Categoria deletada com sucesso"});
    }

}

module.exports = CategoryControler;