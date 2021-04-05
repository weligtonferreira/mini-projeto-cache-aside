const db = require("../config/database");

const { client, query } = db;

module.exports = { 
    
    // ==> Método responsável por retornar todos os produtos:

    async index(req, res) {
        await query(
            'SELECT * FROM product ORDER BY product_name ASC',
            ).then(async (response) => {
                return res.status(200).send({ message: "Produtos retornados com sucesso!", products: response.rows });
            }, (error) => {
                return res.status(400).send(({ message: "Ocorreu um erro!", product: null}));
            });
    },

    // ==> Método responsável por mostrar um produto:

    async showProduct(req, res) {
        const { id } = req.params;
        
        client.get(id, async (err, reply) => {
            if (reply != null) {
                const value = JSON.parse(reply.toString());
                return res.status(200).send({ message: "Produto encontrado com sucesso!", product: value });
            } else {
                await query(
                    'SELECT * FROM product WHERE id = $1',
                    [id]
                ).then(async (response) => {
                    if (response.rows[0]) {
                        const value = response.rows[0];
                        client.setex(id, (60 * 60), JSON.stringify(value));
                        
                        return res.status(200).send({ message: "Produto encontrado com sucesso!", product: value });
                    } else {
                        return res.status(404).send({ message: "Produto não encontrado!", product: null });
                    }
                });
            }
        });
    },

    // ==> Método responsável por criar um novo produto:

    async createProduct(req, res) {
        const { id, product_name, quantity, price } = req.body;
        
        await query(
            'INSERT INTO product (id, product_name, quantity, price) VALUES ($1, $2, $3, $4)',
            [id, product_name, quantity, price]
        ).then(async () => {
            return res.status(201).send({ message: "Produto criado com sucesso!", product: { product_name, quantity, price } });
        }, (error) => {
            return res.status(400).send({ message: "O produto já existe!", product: null });
        });
    },

    // ==> Método responsável por atualizar um produto:

    async updateProduct(req, res) {
        const { id } = req.params;
        const { product_name, quantity, price } = req.body;

        await query(
            'UPDATE product SET product_name = $1, quantity = $2, price = $3 WHERE id = $4',
            [product_name, quantity, price, id]
        ).then(async (response) => {
            client.get(id, async (err, reply) => {
                if (reply != null) {
                    client.del(id);
                }
            });

            if (response.rowCount) return res.status(200).send({ message: "Produto atualizado com sucesso!", product: { code: id, product_name, quantity, price } });

            return res.status(404).send({ message: "Produto não encontrado!", product: null });

        });
    },

    // ==> Método responsável por deletar um produto:

    async deleteProduct(req, res) {
        const { id } = req.params;

        await query(
            'DELETE FROM product WHERE id = $1',
            [id]
        ).then(async (response) => {
            client.get(id, async (err, reply) => {
                if (reply != null) {
                    client.del(id);
                }
            });

            if (response.rowCount) return res.status(200).send({ message: "Produto excluído!", product: null });

            return res.status(404).send({ message: "Produto não encontrado!", product: null });

        });
    }
};
