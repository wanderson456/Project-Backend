const ProductModel = require('../models/ProductsModel');

class ProductController {
    async listAll(request,response){
        
        let product   = await ProductModel.findAll();
       
        return response.json(product);
    }

    async create(request, response) {
        const { enabled, name, slug, stock, description, price, price_with_discount,  } = request.body;
    
        
        if (!name || !slug || price === undefined || price_with_discount ) {
            return response.status(400).json({ message: "Dados incompletos. Campos obrigatórios: name, slug, price, price_with_discount." });
        }
    
        try {
            
            const newProduct = await ProductModel.create({
                enabled,
                name,
                slug,
                stock,
                description,
                price,
                price_with_discount
            });
    
           
    
        
            return response.status(201).json({
                message: "Produto cadastrado com sucesso",
                product: {
                    id: newProduct.id,
                    enabled: newProduct.enabled,
                    name: newProduct.name,
                    slug: newProduct.slug,
                    stock: newProduct.stock,
                    description: newProduct.description,
                    price: newProduct.price,
                    price_with_discount: newProduct.price_with_discount,
               
                }
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao cadastrar produto", error });
        }
    }
    async search(request, response) {
        try {
            const { limit = 12, page = 1, fields, match, category_ids, price_range, option } = request.query;

    
            const limitValue = parseInt(limit);
            const offset = (page - 1) * limitValue;
            const whereConditions = {};
            const selectedFields = fields ? fields.split(',') : null;

            
            if (match) {
                whereConditions.$or = [
                    { name: { $like: `%${match}%` } },
                    { description: { $like: `%${match}%` } }
                ];
            }

            
            if (category_ids) {
                whereConditions.category_ids = { $overlap: category_ids.split(',').map(Number) };
            }

            
            if (price_range) {
                const [minPrice, maxPrice] = price_range.split('-').map(Number);
                whereConditions.price = { $between: [minPrice, maxPrice] };
            }

            
            if (option) {
                for (let [key, values] of Object.entries(option)) {
                    whereConditions[`options.${key}`] = { $contains: values.split(',') };
                }
            }

            
            const products = await ProductModel.findAll({
                where: whereConditions,
                limit: limitValue !== -1 ? limitValue : undefined,
                offset: limitValue !== -1 ? offset : undefined,
                attributes: selectedFields
            });

            
            const total = await ProductModel.count({ where: whereConditions });

            return response.json({ data: products, total, limit: limitValue, page });
        } catch (error) {
            return response.status(400).json({ message: "Erro na busca de produtos", error });
        }
    }

    
    async searchByid(request, response) {
        try {
            const  id  = request.params.id;
            const product = await ProductModel.findOne({ where: { id } });

            if (!product) {
                return response.status(404).json({ message: "Produto não encontrado" });
            }

            return response.json({
                id: product.id,
                enabled: product.enabled,
                name: product.name,
                slug: product.slug,
                stock: product.stock,
                description: product.description,
                price:product.price,
                price_with_discount: product.price_with_discount,
               
            });
        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar produto", error });
        }
    }

    
    
    
    async update(request, response) {
        try {
            const  id  = request.params.id;
            const productData = request.body;

            const [updated] = await ProductModel.update(productData, { where: { id } });

            if (!updated) {
                return response.status(404).json({ message: "Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao atualizar produto", error });
        }
    }

    
    async delete(request, response) {
        try {
            const  id  = request.params.id;

            const deleted = await ProductModel.destroy({ where: { id } });

            if (!deleted) {
                return response.status(404).json({ message: "Produto não encontrado" });
            }

            return response.status(204).send(); 
        } catch (error) {
            return response.status(400).json({ message: "Erro ao deletar produto", error });
        }
    }
}

module.exports =  ProductController;
