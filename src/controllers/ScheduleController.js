const Schedule = require('../models/Schedule');
const Customer = require('../models/Customer');
const Service = require('../models/Service');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

module.exports = {

	async index (req, res) {

		// Por padrão usa o mês atual
		let { month = new Date().getMonth() + 1 } = req.query;

		try {

			// Busca os agendamentos do mês e conta-os fazendo um 'join' com clientes e serviços
			const schedules = await Schedule.findAndCountAll({
				include: [{association: 'customer'}, {association: 'service'}],
				where: sequelize.where(sequelize.fn('month', sequelize.col('date_time')), parseInt(month)) // WHERE month('date_time') = month
			});

			return res.json(schedules);

		} catch(error) {
			return res.status(400).json({errors: "Não foi possível processar esta requisição"});
		}

	},

	async get (req, res) {
		const { id } = req.params;

		try {
			// Busca um agendamento fazendo um 'join' com cliente e serviço
			const schedule = await Schedule.findByPk(id, {
				include: [{association: 'customer'}, {association: 'service'}]
			});

			if (!schedule) {
				return res.status(404).json({errors: "Agendamento não encontrado"});
			}

			return res.json(schedule);

		} catch(error) {
			return res.status(400).json({errors: "Não foi possível processar esta requisição"});
		}

	},

	async create (req, res) {
		const { customer_id, service_id, date_time } = req.body;

		try {

			// Verifica se o cliente existe
			const customer = await Customer.findByPk(customer_id);
			if (!customer)
				return res.status(400).json({errors: "Cliente não existente na base de dados."});

			// Verifica se o serviço existe
			const service = await Service.findByPk(service_id);
			if (!service)
				return res.status(400).json({errors: "Serviço não existente na base de dados."});

			// Verifica se o horário ja está agendado
			const schedule_in_date = await Schedule.findAll({where: { date_time }});
			if (schedule_in_date.length)
				return res.status(400).json({errors: "Este horário já está reservado para outro cliente"});

			const schedule = await Schedule.create( { customer_id, service_id, date_time } );

			return res.json(schedule);

		} catch(error) {

			if (error.name == 'SequelizeValidationError') {
				return res.status(400).json({errors: error.errors.map(e => e.message)});
			} else {
				return res.status(400).json({errors: "Não foi possível processar esta requisição"});
			}

		}

	},

	async update (req, res) {
		const { id } = req.params;
		
		const { customer_id, service_id, date_time } = req.body;

		try {

			// Verifica se o cliente existe
			const customer = await Customer.findByPk(customer_id);
			if (!customer)
				return res.status(400).json({error: "Cliente não existente na base de dados."});

			// Verifica se o serviço existe
			const service = await Service.findByPk(service_id);
			if (!service)
				return res.status(400).json({error: "Serviço não existente na base de dados."});

			// Verifica se o horário ja está agendado
			const schedule_in_date = await Schedule.findAll({ where: { date_time, id: { [Op.ne]: id} } });
			if (schedule_in_date.length)
				return res.status(400).json({errors: "Este horário já está reservado para outro cliente"});

			const schedule = await Schedule.update( { customer_id, service_id, date_time }, { where: { id } } );

			return res.json(schedule);

		} catch (error) {

			if (error.name == 'SequelizeValidationError') {
				return res.status(400).json({errors: error.errors.map(e => e.message)});
			} else {
				return res.status(400).json({errors: "Não foi possível processar esta requisição"});
			}

		}

	},

	async delete (req, res) {
		const { id } = req.params;

		try {

			const schedule = await Schedule.destroy( { where: { id } } );
			return res.send();

		} catch(error) {

			return res.status(400).json({errors: "Não foi possível processar esta requisição"});

		}
		
	}

}