const ProductCategoryModel = require('../models/ProductCategoryModel');

class ProductCategoryController {

    async listAll(request, response) {
        try {
            const productCategories = await ProductCategoryModel.findAll();
            return response.json(productCategories);
        } catch (error) {
            return response.status(500).json({ message: "Erro ao listar categorias de produtos", error });
        }
    }

    async create(request, response) {
        const { product_id, category_id } = request.body;

        if (!product_id || !category_id) {
            return response.status(400).json({ message: "Dados incompletos. Campos obrigatórios: product_id, category_id." });
        }

        try {
            const newProductCategory = await ProductCategoryModel.create({
                product_id,
                category_id
            });

            return response.status(201).json({
                message: "Categoria de Produto associada com sucesso",
                productCategory: {
                    product_id,
                    category_id
                }
            });
        } catch (error) {
            return response.status(500).json({ message: "Erro ao associar categoria ao produto", error });
        }
    }

    async searchById(request, response) {
        try {
            const id = request.params.id;
            const productCategory = await ProductCategoryModel.findOne({ where: { id } });

            if (!productCategory) {
                return response.status(404).json({ message: "Categoria de Produto não encontrada" });
            }

            return response.json({
                id: productCategory.id,
                product_id: productCategory.product_id,
                category_id: productCategory.category_id
            });
        } catch (error) {
            return response.status(400).json({ message: "Erro ao buscar categoria de produto", error });
        }
    }

    async update(request, response) {
        try {
            const id = request.params.id;
            const categoryData = request.body;

            const [updated] = await ProductCategoryModel.update(categoryData, { where: { id } });

            if (!updated) {
                return response.status(404).json({ message: "Categoria de Produto não encontrada" });
            }

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ message: "Erro ao atualizar categoria de produto", error });
        }
    }

    async delete(request, response) {
        try {
            const id = request.params.id;

            const deleted = await ProductCategoryModel.destroy({ where: { id } });

            if (!deleted) {
                return response.status(404).json({ message: "Categoria de Produto não encontrada" });
            }

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ message: "Erro ao deletar categoria de produto", error });
        }
    }
}

module.exports = ProductCategoryController;
