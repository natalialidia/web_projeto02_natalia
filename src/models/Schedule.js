const { Model, DataTypes } = require('sequelize');

class Schedule extends Model {

	static init(connection) {
		super.init({
			date_time: DataTypes.DATE,
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