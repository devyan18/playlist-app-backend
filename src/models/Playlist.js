import { Schema, model } from 'mongoose';

const PlaylistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  musics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Music',
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const PlaylistModel = model('Playlist', PlaylistSchema);
