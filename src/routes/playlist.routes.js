import { Router } from 'express';

import {
  ctrlCreatePlaylist,
  ctrlDeletePlaylist,
  ctrlGetPlaylist,
  ctrlListPlaylist,
  ctrlUpdatePlaylist,
} from '../controllers/playlist.controller.js';
import {
  createPlaylistValidations,
  deletePlaylistValidations,
  getPlaylistValidations,
  listPlaylistValidations,
  updatePlaylistValidations
} from '../models/validations/playlist-validations.js';

const playlistRouter = Router();

playlistRouter.post('/', createPlaylistValidations, ctrlCreatePlaylist);
playlistRouter.get('/', listPlaylistValidations, ctrlListPlaylist);

playlistRouter.get('/:playlistId', getPlaylistValidations, ctrlGetPlaylist);
playlistRouter.patch('/:playlistId', updatePlaylistValidations, ctrlUpdatePlaylist);
playlistRouter.delete('/:playlistId', deletePlaylistValidations, ctrlDeletePlaylist);

export { playlistRouter };
