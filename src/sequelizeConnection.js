import { Sequelize, DataTypes } from 'sequelize';

const sequelizeHost = process.env['DOCKER'] === 'true' ? 'db' : 'localhost';

console.log('Sequelize host: ', sequelizeHost);

export const sequelizeConnection = new Sequelize({
	database: 'mydb',
	username: 'root',
	password: 'rootpass', //WARNING: да да, секреты выкинуть в .env, но это стоковые
	dialect: 'mysql',
	host: sequelizeHost,
	port: 3306
});

export const GPS = sequelizeConnection.define('GPS', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	lat: DataTypes.FLOAT,
	lng: DataTypes.FLOAT,
	gps_time: DataTypes.DATE,
	created_at: {
		type: DataTypes.DATE,
		generatedColumn: true
	}
}, {
	tableName: "GPS",
	timestamps: false
});
