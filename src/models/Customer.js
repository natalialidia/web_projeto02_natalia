const { Model, DataTypes } = require('sequelize');

class Customer extends Model {

	static init(connection) {
		super.init({
			name: DataTypes.STRING,
			instagram: DataTypes.STRING,
			phone: DataTypes.STRING
		}, {
			sequelize: connection
		})

	}

	// Cliente tem um relacionamento N:N com serviço por meio da tabela Schedule
	static associate(models) {
		this.belongsToMany(models.Service, { foreignKey: 'customer_id', through: 'schedule', as: 'services' });
	}

}

module.exports = Customer;