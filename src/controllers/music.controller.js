import { MusicModel } from '../models/Music.js';
import { PlaylistModel } from '../models/Playlist.js';
import { isAuthor } from './playlist.controller.js';

export const ctrlCreateMusic = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user._id;

  const isPlaylistAuthor = await isAuthor({ playlistId, userId });

  if (!isPlaylistAuthor) {
    return res.status(403).json({ error: 'User is not the playlist author' });
  }

  try {
    const music = new MusicModel({
      ...req.body,
      playlist: playlistId,
    });

    await music.save();

    await PlaylistModel.findOneAndUpdate(
      { _id: playlistId },
      { $push: { musics: music._id } }
    );

    res.status(201).json(music);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create music" });
  }
};

export const ctrlListMusics = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user._id;

  const isPlaylistAuthor = await isAuthor({ playlistId, userId });

  if (!isPlaylistAuthor) {
    return res.status(403).json({ error: 'User is not the playlist author' });
  }

  try {
    const musics = await MusicModel.find({ playlist: playlistId }, [
      '-__v',
    ]).populate('playlist', ['-musics', '-author', '-__v']);

    res.status(200).json(musics);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get musics" });
  }
};

export const ctrlGetMusicById = async (req, res) => {
  const { musicId, playlistId } = req.params;
  const userId = req.user._id;

  const isPlaylistAuthor = await isAuthor({ playlistId, userId });

  if (!isPlaylistAuthor) {
    return res.status(403).json({ error: 'User is not the playlist author' });
  }

  try {
    const music = await MusicModel.findOne({
      _id: musicId,
      playlist: playlistId,
    }).populate('playlist');

    if (!music) return res.status(404).json({ error: "Music doesn't exist" });

    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get music" });
  }
};

export const ctrlUpdateMusic = async (req, res) => {
  const { musicId, playlistId } = req.params;
  const userId = req.user._id;

  const isPlaylistAuthor = await isAuthor({ playlistId, userId });

  if (!isPlaylistAuthor) {
    return res.status(403).json({ error: 'User is not the playlist author' });
  }

  try {
    const music = await MusicModel.findOne({ _id: musicId });

    if (!music) {
      return res.status(404).json({ error: "Music doesn't exist" });
    }

    music.set(req.body);

    await music.save();

    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update music" });
  }
};

export const ctrlDeleteMusic = async (req, res) => {
  const { musicId, playlistId } = req.params;
  const userId = req.user._id;

  const isPlaylistAuthor = await isAuthor({ playlistId, userId });

  if (!isPlaylistAuthor) {
    return res.status(403).json({ error: 'User is not the playlist author' });
  }

  try {
    await MusicModel.findOneAndDelete({ _id: musicId, playlist: playlistId });

    await PlaylistModel.findOneAndUpdate(
      { _id: playlistId },
      { $pull: { musics: musicId } }
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete music" });
  }
};
