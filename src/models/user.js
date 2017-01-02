'use strict';

// Imports
import mongoose from 'mongoose';
import bcrypt   from 'bcrypt-nodejs';
import crypto   from 'crypto';

// Constants
const Schema = mongoose.Schema;

// Model
const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  createdAt: { type: Date, default: Date.now() },
  lastLoginAt: Date
});

// Callbacks
UserSchema.pre('save', (next) => {
  let user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// Model Methods
UserSchema.methods.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

// Export
export default mongoose.model('User', UserSchema);
