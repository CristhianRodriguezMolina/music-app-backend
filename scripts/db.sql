CREATE DATABASE IF NOT EXISTS music_app;

USE music_app;

CREATE TABLE IF NOT EXISTS songs(
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	artist VARCHAR(100),
	album VARCHAR(100),
	year INT,
	uri VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO songs (title, artist, album, year) VALUES
	('Blinding Lights', 'TheWeeknd', 'After Hours', 2020),
	('Save Your Tears', 'TheWeeknd', 'After Hours', 2020),
	('Heartless', 'TheWeeknd', 'After Hours', 2020);