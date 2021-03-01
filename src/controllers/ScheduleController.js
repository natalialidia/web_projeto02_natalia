const Schedule = require('../models/Schedule');
const Customer = require('../models/Customer');
const Service = require('../models/Service');

module.exports = {

	async index (req, res) {

		// Busca os agendamentos fazendo um 'join' com clientes e serviços
		const schedules = await Schedule.findAll({
			include: [{association: 'customer'}, {association: 'service'}]
		});

		if (!schedules) {
			return res.status(400).json({error: "Nenhum agendamento encontrado"});
		}

		return res.json(schedules);

	},

	async get (req, res) {
		const { id } = req.params;

		// Busca um agendamento fazendo um 'join' com cliente e serviço
		const schedule = await Schedule.findByPk(id, {
			include: [{association: 'customer'}, {association: 'service'}]
		});

		if (!schedule) {
			return res.status(404).json({error: "Agendamento não encontrado"});
		}

		return res.json(schedule);

	},

	async create (req, res) {
		const { customer_id, service_id, date_time } = req.body;

		// Verifica se o cliente existe
		const customer = await Customer.findByPk(customer_id);
		if (!customer)
			return res.status(400).json({error: "Cliente não existente na base de dados."});

		// Verifica se o serviço existe
		const service = await Service.findByPk(service_id);
		if (!service)
			return res.status(400).json({error: "Serviço não existente na base de dados."});


		const schedule = await Schedule.create( { customer_id, service_id, date_time } );

		return res.json(schedule);
	},

	async update (req, res) {
		const { id } = req.params;
		
		const { customer_id, service_id, date_time } = req.body;

		// Verifica se o cliente existe
		const customer = await Customer.findByPk(customer_id);
		if (!customer)
			return res.status(400).json({error: "Cliente não existente na base de dados."});

		// Verifica se o serviço existe
		const service = await Service.findByPk(service_id);
		if (!service)
			return res.status(400).json({error: "Serviço não existente na base de dados."});

		const schedule = await Schedule.update( { customer_id, service_id, date_time }, { where: { id } } );

		return res.json(schedule);
	},

	async delete (req, res) {
		const { id } = req.params;

		const schedule = await Schedule.destroy( { where: { id } } );

		return res.send();
	}

}