import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    cartData: {
      type: Object,
      default: {},
    },
    // role: {
    //   type: String,
    //   enum: ['user', 'admin'],
    //   default: 'user',
    // },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// export default mongoose.model('User', UserSchema);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
