import { connect } from '../database';

import Song from '../models/Song';

export const getAllSongs = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const [rows] = await mysql.query('SELECT * FROM songs');

		return res.status(200).json({ message: 'Canciones obtenidas', songs: rows });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}

export const getSongById = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const { id } = req.params;

		const [rows] = await mysql.query(`SELECT * FROM songs WHERE id = ${id}`);

		if (rows.length <= 0) {
			return res.status(400).json({ message: 'Cancion no encontrada o inexistente' });
		}

		return res.status(200).json({ message: 'Canciones obtenidas', song: rows[0] });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}

export const getSongsCount = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const [rows] = await mysql.query(`SELECT COUNT(*) AS COUNT_SONGS FROM songs`);

		return res.status(200).json({ message: 'Numero de canciones obtenido', count: rows[0].COUNT_SONGS });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}

export const saveSong = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const { title, artist, album, year, uri } = req.body;

		if (!title && !artist && !album && !year && !uri) {
			return res.status(400).json({ message: 'Datos necesarios' });
		}

		const [results] = await mysql.query(`INSERT INTO songs(title, artist, album, year, uri) VALUES (?, ?, ?, ?, ?)`,
			[
				title,
				artist,
				album,
				year,
				uri
			]);

		const savedSong = {
			id: results.insertId,
			...req.body
		}

		return res.status(200).json({ message: 'Cancion guardada', savedSong });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}

export const deleteSongById = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const { id } = req.params;

		const [results] = await mysql.query(`DELETE FROM songs WHERE id = ${id}`);

		if (results.affectedRows === 0) {
			return res.status(400).json({ message: 'Canción no encontrada o inexistente' });
		}

		return res.status(200).json({ message: 'Canción eliminada' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}

export const updateSongById = async (req, res) => {
	try {
		// Connection
		const mysql = await connect();

		const { title, artist, album, year, uri } = req.body;
		const { id } = req.params;

		if (!title && !artist && !album && !year && !uri) {
			return res.status(400).json({ message: 'Datos necesarios' });
		}

		await mysql.query(`UPDATE songs set ? WHERE id = ${id}`,
			[
				req.body
			]);

		const updatedSong = {
			id: id,
			...req.body
		}

		return res.status(200).json({ message: 'Cancion actualizada', updatedSong });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: 'Ocurrio un error inesperado' });
	}
}