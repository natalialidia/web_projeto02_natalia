const { Model, DataTypes } = require('sequelize');

class Schedule extends Model {

	static init(connection) {
		super.init({
			date_time: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
			    	notNull: {
				        msg: 'Preencha o campo data e hora'
				    },
			    	notEmpty: { 
			    		args: true, 
			    		msg: 'Preencha o campo data e hora'
			    	},
			    	isDate: {
			    		msg: 'Preencha uma data válida'
			    	}
			    }
			},
		}, {
			sequelize: connection
		})
	}

	// O agendamento se relaciona com um cliente e um serviço
	static associate(models) {
		this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
		this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' });
	}

}

module.exports = Schedule;