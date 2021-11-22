import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'exhibit'], required: true },
  creatorId: { type: ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
