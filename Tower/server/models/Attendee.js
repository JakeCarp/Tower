import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AttendeeSchema = new Schema({
  eventId: { type: ObjectId, ref: 'Event', required: true },
  accountId: { type: ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

AttendeeSchema.virtual('event', {
  localField: 'eventId',
  ref: 'Event',
  foreignField: '_id',
  justOne: true
})
AttendeeSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
