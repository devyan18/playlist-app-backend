import { Schema, model } from 'mongoose';

const MusicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    default: 'Unknown',
  },
  year: {
    type: Number,
    default: new Date(Date.now()).getFullYear(),
  },
  playlist: {
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const MusicModel = model('Music', MusicSchema);
