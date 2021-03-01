const Service = require('../models/Service');

module.exports = {

	async index (req, res) {

		let { limit = 10, offset = 0 } = req.query;

		limit = parseInt(limit);
		offset = parseInt(offset);

		// Busca e conta todos os registros passando os dados para paginação
		const services = await Service.findAndCountAll({
			limit,
			offset
		});

		return res.json(services);

	},

	async get (req, res) {
		const { id } = req.params;

		const service = await Service.findByPk(id);

		if (!service) 
			return res.status(404).json({error: 'Serviço não encontrado'});

		return res.json(service);

	},

	async create (req, res) {
		const { name, description } = req.body;

		const service = await Service.create( { name, description } );

		return res.json(service);
	},

	async update (req, res) {
		const { id } = req.params;
		
		const { name, description }= req.body;

		const service = await Service.update( { name, description }, { where: { id } } );

		return res.json(service);
	},

	async delete (req, res) {
		const { id } = req.params;

		const service = await Service.destroy( { where: { id } } );

		return res.send();
	}

}