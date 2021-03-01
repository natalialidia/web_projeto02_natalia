const { Model, DataTypes } = require('sequelize');

class Service extends Model {

	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			description: DataTypes.STRING
		}, {
			sequelize: connection
		})

	}

	// Serviço tem um relacionamento N:N com cliente por meio da tabela Schedule
	static associate(models) {
		this.belongsToMany(models.Customer, { foreignKey: 'service_id', through: 'schedule', as: 'customers' });
	}

}

module.exports = Service;