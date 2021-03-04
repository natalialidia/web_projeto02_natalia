const { Model, DataTypes } = require('sequelize');

class Service extends Model {

	static init(connection) {
		super.init({
			name:{
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
			    	notNull: {
				        msg: 'Preencha o campo nome'
				    },
			    	notEmpty: { 
			    		args: true, 
			    		msg: 'Preencha o campo nome'
			    	},
			    	len: {
			    		args:[3, 60],
			    		msg: 'O nome deve ter entre 3 e 60 caracteres'
			    	}
			    }
			},
			description: {
				type: DataTypes.STRING,
				validate: {
			    	max: {
			    		args: 200,
			    		msg: 'A descrição deve ter no máximo 200 caracteres'
			    	}
			    }
			}
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