const ProductOptionsModel = require('../models/ProductOptionsModel');
class ProductOptionsModelController {
   
    async listAll(request,response){
        
        let productoptions   = await ProductOptionsModel.findAll();
       
        return response.json(productoptions);
    }

    async create(request, response) {
        const body = request.body;
    
        
    
        try {
            
         await ProductOptionsModel.create(body);
    
           
    
        
            return response.status(201).json({
                message: "Opçoes do Produto cadastrado com sucesso",
                
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao cadastrar opçoes do Produto ", error });
        }
    }
    

    
    async searchByid(request, response) {
        try {
            const  id  = request.params.id;
            const productoptions = await ProductOptionsModel.findOne({ where: { id } });

            if (!productoptions) {
                return response.status(404).json({ message: "Opçoes do Produto não encontrada" });
            }

            return response.json(productoptions)

        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar opçoes do Produto ", error });
        }
    }

    
    
    
    async update(request, response) {
        try {
            const  id  = request.params.id;
            const productoptions = request.body;

            const [updated] = await ProductOptionsModel.update(productoptions , { where: { id } });

            if (!updated) {
                return response.status(404).json({ message: "Opçoes do Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao atualizar opçoes do produto", error });
        }
    }

    
    async delete(request, response) {
        try {
            const  id  = request.params.id;

            const deleted = await ProductOptionsModel.destroy({ where: { id } });

            if (!deleted) {
                return response.status(404).json({ message: "Opçoes do Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao deletar Opçoes do  produto", error });
        }
    }
}

module.exports =  ProductOptionsModelController;
