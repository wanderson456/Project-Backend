const ProductImagesModel = require('../models/ProductImagesModel');
const ProductModel = require('../models/ProductsModel');
const CategoryModel = require('../models/CategoryModel');

const ProductOptionsModel = require('../models/ProductOptionsModel');
const ProductCategoryModel = require('../models/ProductCategoryModel');

class ProductController {
    constructor(){
        ProductModel.associate({ProductImagesModel,ProductOptionsModel,CategoryModel,ProductModel ,ProductCategoryModel})
        
            
        
        
    }

    async listAll(request, response) {
        
        try {
            const products = await ProductModel.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        
                        model: ProductImagesModel,
                        as: 'images',
                        attributes: ['id', 'path']
                    },
                    {
                        model: ProductOptionsModel,
                        as: 'options',
                        
                    },

                    {
                        through: {attributes:[]},
                        
                        as: 'category_ids',
                        model: CategoryModel,
                       attributes:['id']
                      
                        
                    }
                   
                   
                    
                
                
                ]
                
            });
            return response.json(products);
        } catch (error) {
            return response.status(500).json({ message: "Erro ao listar produtos", error });
        }
    }

    async create(request, response) {
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = request.body;
    
        if (!name || !slug || price === undefined || price_with_discount === undefined) {
            return response.status(400).json({ message: "Dados incompletos. Campos obrigatórios: name, slug, price, price_with_discount." });
        }
    
        try {
            
            const newProduct = await ProductModel.create({
                enabled, name, slug, stock, description, price, price_with_discount
            });
    
            
            if (category_ids && category_ids.length > 0) {
                await Promise.all(category_ids.map(categoryId => 
                    ProductCategoryModel.create({
                        product_id: newProduct.id,
                        category_id: categoryId
                    })
                ));
            }
    
            
            if (images && images.length > 0) {
                await Promise.all(images.map(image => 
                    ProductImagesModel.create({
                        product_id: newProduct.id,
                        enable: image.enable,
                        path: image.path
                    })
                ));
            }
    
            
            if (options && options.length > 0) {
                await Promise.all(options.map(option => 
                    ProductOptionsModel.create({
                        product_id: newProduct.id,
                        title: option.title,
                        shape: option.shape,
                        radius: option.radius,
                        type: option.type,
                        values: option.value.join(',') 
                    })
                ));
            }
    
            return response.status(201).json({
                message: "Produto cadastrado com sucesso",
                product: newProduct
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
                whereConditions[Sequelize.Op.or] = [
                    { name: { [Sequelize.Op.iLike]: `%${match}%` } },
                    { description: { [Sequelize.Op.iLike]: `%${match}%` } }
                ];
            }

            if (category_ids) {
                whereConditions[Sequelize.Op.and] = [
                    Sequelize.where(Sequelize.col('categories.id'), Sequelize.Op.in, category_ids.split(',').map(Number))
                ];
            }

            if (price_range) {
                const [minPrice, maxPrice] = price_range.split('-').map(Number);
                whereConditions.price = { [Sequelize.Op.between]: [minPrice, maxPrice] };
            }

            

            const products = await ProductModel.findAll({
                where: whereConditions,
                limit: limitValue !== -1 ? limitValue : undefined,
                offset: limitValue !== -1 ? offset : undefined,
                attributes: selectedFields,
                
            });

            const total = await ProductModel.count({ where: whereConditions });

            return response.json({ data: products, total, limit: limitValue, page });
        } catch (error) {
            return response.status(400).json({ message: "Erro na busca de produtos", error });
        }
    }

    async searchByid(request, response) {
        try {
            const { id } = request.params;
            const product = await ProductModel.findOne({
                where: { id },
                include: [
                    {
                        model: ProductImagesModel,
                        as: 'images',
                        attributes: ['id', 'path']
                    },
                    {
                        model: ProductOptionsModel,
                        as: 'options',
                        
                    },
                    {
                        through: {attributes:[]},
                        
                        as: 'category_ids',
                        model: CategoryModel,
                       attributes:['id']
                      
                        
                    }
                
                ]
            });

            if (!product) {
                return response.status(404).json({ message: "Produto não encontrado" });
            }

            return response.json(product);
        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar produto", error });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;
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
            const { id } = request.params;

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

module.exports = ProductController;
