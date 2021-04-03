const Service = require('../models/Service');
const { Op } = require("sequelize");

module.exports = {

	async index (req, res) {

		let { limit = 10, page = 0, search = '' } = req.query;

		page = page > 0 ? page - 1 : 0;

		limit = parseInt(limit);
		offset = parseInt((page) * limit);

		try {

			// Busca e conta todos os registros passando os dados para paginação
			const services = await Service.findAndCountAll({
				where:{ 
					'name': {
						[Op.substring]: search // ... WHERE name LIKE %search%
					}
				},
				limit,
				offset,
				order: [['id', 'DESC']] //Mais recentes primeiro
			});

			return res.json({services: services.rows, pagination: {limit, page: page+1, total: services.count}});

		} catch(error) {
			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
		}

	},

	async get (req, res) {
		const { id } = req.params;

		try {

			const service = await Service.findByPk(id);

			if (!service) 
				return res.status(404).json({errors: 'Serviço não encontrado'});

			return res.json(service);

		} catch(error) {
			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
		}

	},

	async create (req, res) {
		const { name, description } = req.body;

		try {

			const service = await Service.create( { name, description } );

			return res.json(service);

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
		
		try {

			const { name, description } = req.body;

			const service = await Service.update( { name, description }, { where: { id } } );

			return res.json(service);

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

			const service = await Service.destroy( { where: { id } } );

			return res.send();

		} catch(error) {
			
			return res.status(400).json({errors: ["Não foi possível processar esta requisição"]});
			
		}

	}

}