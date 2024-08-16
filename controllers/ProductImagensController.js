const ProductImagesModel = require('../models/ProductImagesModel');
class ProductImagensController {
   
    async listAll(request,response){
        
        let productimage   = await ProductImagesModel.findAll();
       
        return response.json(productimage);
    }

    async create(request, response) {
        const { product_id , enabled , path } = request.body;
    
        
        if (!product_id || !path ) {
            return response.status(400).json({ message: "Dados incompletos. Campos obrigatórios: name, slug, price, price_with_discount." });
        }
    
        try {
            
            const newProductimage = await ProductImagesModel.create({
               product_id,
                enabled,
                path
            });
    
           
    
        
            return response.status(201).json({
                message: "Imagem do Produto cadastrado com sucesso",
                product: {
                    product_id,
                    enabled,
                    path
               
                }
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao cadastrar Imagem do Produto ", error });
        }
    }
    

    
    async searchByid(request, response) {
        try {
            const  id  = request.params.id;
            const productimage = await ProductImagesModel.findOne({ where: { id} });
            console.log(productimage)

            if (!productimage) {
                return response.status(404).json({ message: "Imagem do Produto não encontrada" });
            }

            return response.json({
                id: productimage.id,
                path: productimage.path,
                
            });
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: "Erro ao buscar Imagem do Produto ", error });
        }
    }

    
    
    
    async update(request, response) {
        try {
            const  id  = request.params.id;
            const ImageproductData = request.body;

            const [updated] = await ProductImagesModel.update(ImageproductData, { where: { id } });

            if (!updated) {
                return response.status(404).json({ message: "Imagem do Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao atualizar Imagem do produto", error });
        }
    }

    
    async delete(request, response) {
        try {
            const  id  = request.params.id;

            const deleted = await ProductImagesModel.destroy({ where: { id } });

            if (!deleted) {
                return response.status(404).json({ message: "Imagem do Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao deletar Imagem do  produto", error });
        }
    }
}

module.exports =  ProductImagensController;
