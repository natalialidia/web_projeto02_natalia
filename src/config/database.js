// module.exports = {
//   	dialect: 'sqlite',
//   	storage: '../database/projeto-salao.sqlite',
//   	define: {
//   		timestamps: true,
//   		underscored: true
//   	}
// }

module.exports = {
  	dialect:  'mysql',
  	host: 	  'localhost',
  	database: 'projeto-salao',
  	username: 'root',
  	password: '',
  	define: {
  		timestamps: true, // created_at, updated_at
  		underscored: true, // Atributos em snake case
  		freezeTableName: true // Nome da tabela igual ao nome do model
  	}
}