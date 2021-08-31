import mysql from 'mysql2/promise';
import { config } from './config';

export const connect = async () => {
	try {
		const conn = await mysql.createConnection(config);

		console.log('DB connected');

		return conn;
	} catch (error) {
		console.log(error);
	}
}