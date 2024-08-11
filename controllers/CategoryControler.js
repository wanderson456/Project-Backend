const CategoryModel = require('../models/CategoryModel');
class CategoryControler {
    

    async search(request, response) {
        const { limit = 12, page = 1, fields, use_in_menu } = request.query;

        const queryOptions = {};

        if (parseInt(limit) !== -1) {
            queryOptions.limit = parseInt(limit);
            queryOptions.offset = (parseInt(page) - 1) * queryOptions.limit;
        }

        if (fields) {
            queryOptions.attributes = fields.split(',');
        }

        if (use_in_menu !== undefined) {
            queryOptions.where = { use_in_menu: use_in_menu === 'true' };
        }

        try {
            const categories = await CategoryModel.findAll(queryOptions);
            const total = await CategoryModel.count(queryOptions.where ? { where: queryOptions.where } : {});

            return response.status(200).json({
                data: categories,
                total,
                limit: parseInt(limit),
                page: parseInt(page)
            });
        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar categorias", error });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            
            const category = await CategoryModel.findOne({ where: { id } });

           
            if (!category) {
                return response.status(404).json({ message: "Categoria não encontrada" });
            }

            
            return response.status(200).json({
                id: category.id,
                name: category.name,
                slug: category.slug,
                use_in_menu: category.use_in_menu
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao buscar categoria", error });
        }
    }

    async create(request, response) {
        const { name, slug } = request.body;
        let category = request.body;

        if (!name || !slug ) {
            return response.status(400).json({ message: "Dados incompletos. name e slug são campos obrigatórios." });
        }

        try {

            const newCategory = await CategoryModel.create(category);

            
            return response.status(201).json({
                message: "Categoria cadastrada com sucesso",
                category: {
                    id: newCategory.id,
                    name: newCategory.name,
                    slug: newCategory.slug,
                    use_in_menu: newCategory.use_in_menu
                    
                }
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao cadastrar categoria", error });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, slug, use_in_menu} = request.body;

        
        if (!name || !slug ) {
            return response.status(400).json({ message: "Dados incompletos. Todos os campos são obrigatórios." });
        }

        try {
            
            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return response.status(404).json({ message: "Categoria não encontrada" });
            }

            
            await category.update({
                name,
                slug,
                use_in_menu,
                
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ message: "Erro ao atualizar categoria", error });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
    
            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return response.status(404).json({ message: "Categoria não encontrada" });
            }

            
            await category.destroy();

        
            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ message: "Erro ao deletar categoria", error });
        }
    }

}

module.exports = CategoryControler;