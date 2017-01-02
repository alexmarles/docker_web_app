'use strict';

// Imports
import mongoose from 'mongoose';

// Constants
const Schema = mongoose.Schema;

// Model
const ProductSchema = Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type  : String, enum : ['computers', 'phones', 'accessories'] },
  description: String
});

// Export
export default mongoose.model('Product', ProductSchema);
