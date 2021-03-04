const { Model, DataTypes } = require('sequelize');

class Customer extends Model {

	static init(connection) {
		super.init({
			name: {
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
			    		args:[3, 100],
			    		msg: 'O nome deve ter entre 3 e 100 caracteres'
			    	}
			    }
			},
			instagram: {
				type:DataTypes.STRING,
				validate: {
			    	len: {
			    		args:[3, 50],
			    		msg: 'O instagram deve ter entre 3 e 50 caracteres'
			    	}
			    }
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
			    	notNull: {
				        msg: 'Preencha o campo telefone'
				    },
			    	notEmpty: { 
			    		args: true, 
			    		msg: 'Preencha o campo telefone'
			    	},
			    	len: {
			    		args:[10, 11],
			    		msg: 'O telefone deve ter entre 10 e 11 dígitos'
			    	}
			    }
			}
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