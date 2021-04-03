const Customer = require('../models/Customer');
const { Op } = require("sequelize");

module.exports = {

	async index (req, res) {

		let { limit = 10, page = 0, search='' } = req.query;

		page = page > 0 ? page - 1 : 0;

		limit = parseInt(limit);
		offset = parseInt((page) * limit);

		try {

			// Busca e conta todos os registros passando os dados para paginação
			const customers = await Customer.findAndCountAll({
				where:{ 
					'name': {
						[Op.substring]: search // ... WHERE name LIKE %search%
					}
				},
				limit,
				offset,
				order: [['id', 'DESC']] //Mais recentes primeiro
			});

			return res.json({customers: customers.rows, pagination: {limit, page: page+1, total: customers.count}});

		} catch (error) {

			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});

		}

	},

	async get (req, res) {
		const { id } = req.params;

		try {

			const customer = await Customer.findByPk(id);

			if (!customer)
				return res.status(404).json({errors: "Cliente não encontrado"});

			return res.json(customer);

		} catch (error) {

			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});

		}


	},

	async create (req, res) {
		const { name, instagram, phone } = req.body;

		try	{
			
			const customer = await Customer.create( { name, instagram, phone } );

			return res.json(customer);

		} catch(error) {

			if (error.name == 'SequelizeValidationError') {
				return res.status(400).json({errors: error.errors.map(e => e.message)});
			} else {
				return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
			}
		}

	},

	async update (req, res) {
		const { id } = req.params;
		
		const { name, instagram, phone } = req.body;

		try {

			const customer = await Customer.update( {name, instagram, phone }, { where: { id } } );

			return res.json(customer);

		} catch(error) {

			if (error.name == 'SequelizeValidationError') {
				return res.status(400).json({errors: error.errors.map(e => e.message)});
			} else {
				return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
			}

		}		
	},

	async delete (req, res) {
		const { id } = req.params;

		try {

			const customer = await Customer.destroy( { where: { id } } );

			return res.send();

		} catch(error) {
			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
		}

	}

}