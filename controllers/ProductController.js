const ProductModel = require('../models/ProductsModel');

class ProductController {

    
    async pesquisar(request, response) {
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

    
    async listar(request, response) {
        try {
            const  id  = request.params.id;
            const product = await ProductModel.findOne({ where: { id } });

            if (!product) {
                return response.status(404).json({ message: "Produto não encontrado" });
            }

            return response.json(product);
        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar produto", error });
        }
    }

    
    async criar(request, response) {
        try {
            const body = request.body;
            const Product = await ProductModel.create(body);
            return response.status(201).json(Product);
        } catch (error) {
            return response.status(400).json({ message: "Erro ao criar produto", error });
        }
    }

    
    async atualizar(request, response) {
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

    
    async deletar(request, response) {
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
