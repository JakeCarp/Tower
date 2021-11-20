import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  eventId: { type: ObjectId, ref: 'Event', required: true },
  creatorId: { type: ObjectId, ref: 'Account', required: true },
  body: { type: String, required: true },
  creatorIsAttending: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
CommentSchema.virtual('event', {
  localField: 'eventId',
  ref: 'Event',
  foreignField: '_id',
  justOne: true
})
