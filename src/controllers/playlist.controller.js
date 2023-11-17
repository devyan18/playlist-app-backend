import { PlaylistModel } from '../models/Playlist.js';
import { MusicModel } from '../models/Music.js';

export const ctrlCreatePlaylist = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title } = req.body;

    const playlist = new PlaylistModel({
      title,
      author: userId,
    });

    await playlist.save();

    return res.status(201).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlListPlaylist = async (req, res) => {
  const userId = req.user._id;

  try {
    const playlists = await PlaylistModel.find({ author: userId })
      .populate('author', ['username', 'avatar'])
      .populate('musics', ['name', 'artist', 'year']);

    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetPlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PlaylistModel.findOne({
      _id: playlistId,
      author: userId,
    })
      .populate('author', ['username', 'avatar'])
      .populate('musics', ['name', 'artist', 'year']);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlUpdatePlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PlaylistModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    playlist.set(req.body);

    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlDeletePlaylist = async (req, res) => {
  const userId = req.user._id;
  const { playlistId } = req.params;

  try {
    const playlist = await PlaylistModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    await MusicModel.deleteMany({ _id: { $in: playlist.musics } });

    await PlaylistModel.findOneAndDelete({
      _id: playlistId,
      author: userId,
    });

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const isAuthor = async ({ playlistId, userId }) => {
  try {
    const playlist = await PlaylistModel.findOne({
      _id: playlistId,
      author: userId,
    });

    if (!playlist) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
