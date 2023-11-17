import { Router } from 'express';

import {
  ctrlCreateMusic,
  ctrlListMusics,
  ctrlGetMusicById,
  ctrlUpdateMusic,
  ctrlDeleteMusic,
} from '../controllers/music.controller.js';

import {
  createMusicValidations,
  deleteMusicValidations,
  getMusicValidations,
  listMusicValidations,
  updateMusicValidations,
} from '../models/validations/music-validations.js';

const musicRouter = Router();

musicRouter.post('/:playlistId/', createMusicValidations, ctrlCreateMusic);
musicRouter.get('/:playlistId/', listMusicValidations, ctrlListMusics);

musicRouter.get('/:playlistId/:musicId', getMusicValidations, ctrlGetMusicById);
musicRouter.patch('/:playlistId/:musicId', updateMusicValidations, ctrlUpdateMusic);
musicRouter.delete('/:playlistId/:musicId', deleteMusicValidations, ctrlDeleteMusic);

export { musicRouter };
