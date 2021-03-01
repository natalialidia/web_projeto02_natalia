const Customer = require('../models/Customer');

module.exports = {

	async index (req, res) {

		let { limit = 10, page = 0 } = req.query;

		page = page > 0 ? page - 1 : 0;

		limit = parseInt(limit);
		offset = parseInt((page) * limit);

		// Busca e conta todos os registros passando os dados para paginação
		const customers = await Customer.findAndCountAll({
			limit,
			offset
		});

		return res.json(customers);

	},

	async get (req, res) {
		const { id } = req.params;

		const customer = await Customer.findByPk(id);

		if (!customer)
			return res.status(404).json({error: "Cliente não encontrado"});

		return res.json(customer);

	},

	async create (req, res) {
		const { name, instagram, phone } = req.body;

		const customer = await Customer.create( { name, instagram, phone } );

		return res.json(customer);
	},

	async update (req, res) {
		const { id } = req.params;
		
		const { name, instagram, phone } = req.body;

		const customer = await Customer.update( {name, instagram, phone }, { where: { id } } );

		return res.json(customer);
	},

	async delete (req, res) {
		const { id } = req.params;

		const customer = await Customer.destroy( { where: { id } } );

		return res.send();
	}

}