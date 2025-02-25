import { Sequelize, DataTypes } from 'sequelize';

export const sequelizeConnection = new Sequelize({
	database: 'mydb',
	username: 'root',
	password: 'rootpass',
	dialect: 'mysql',
	host: 'localhost',
	port: 3306
});

export const GPS = sequelizeConnection.define('GPS', {
	id: DataTypes.INTEGER,
	lat: DataTypes.FLOAT,
	lng: DataTypes.FLOAT,
	gps_time: DataTypes.DATE,
	created_at: DataTypes.DATE
});
