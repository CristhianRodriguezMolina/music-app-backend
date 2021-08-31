//NPM modules imports
import { Router } from 'express';
const router = Router();

// Controller
import * as songCtrl from '../controllers/song.controller';

/**
 * @swagger
 * tags:
 *    name: Songs
 *    description: tasks endpoint
 */

/**
 * @swagger
 * /api/song:
 *  get:
 *    summary: Get all the songs in the platform
 *    tags: [Songs]
 */
router.get('/', songCtrl.getAllSongs);

/**
 * @swagger
 * /api/song/count:
 *  get:
 *    summary: Get the number of songs in the platform
 *    tags: [Songs]
 */
router.get('/count', songCtrl.getSongsCount);

/**
 * @swagger
 * /api/song/:id:
 *  get:
 *    summary: Get a song by its id
 *    tags: [Songs]
 */
router.get('/:id', songCtrl.getSongById);

/**
 * @swagger
 * /api/song:
 *  post:
 *    summary: Create a song
 *    tags: [Songs]
 */
router.post('/', songCtrl.saveSong);

/**
 * @swagger
 * /api/song/:id:
 *  delete:
 *    summary: Delete a song by its id
 *    tags: [Songs]
 */
router.delete('/:id', songCtrl.deleteSongById);

/**
 * @swagger
 * /api/song/:id:
 *  put:
 *    summary: Update a song
 *    tags: [Songs]
 */
router.put('/:id', songCtrl.updateSongById);

export default router;