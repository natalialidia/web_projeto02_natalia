module.exports = {
  	dialect:  'mysql',
  	host: 	  'localhost',
  	database: 'projeto-salao',
  	username: 'root',
  	password: '',
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) { // ler do banco datetime em string
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
  	define: {
  		timestamps: false, //Desabilitar created_at, updated_at
  		underscored: true, // Atributos em snake case
  		freezeTableName: true // Nome da tabela igual ao nome do model
  	}
}