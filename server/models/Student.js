import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  socketId: String,
  name: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Student', studentSchema);