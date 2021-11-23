import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'
import { commentsService } from './CommentsService'
import { eventsService } from './EventsService'

class AttendeesService {
  async getAll(query) {
    const attendees = await dbContext.Attendees.find(query).populate('account').populate('event')
    return attendees
  }

  async createAttendee(attendeeData) {
    const attendee = await dbContext.Attendees.create(attendeeData)
    await attendee.populate('account')
    await attendee.populate('event')
    commentsService.toggleCreatorAttending(attendee.accountId, true)
    await eventsService.attend(attendee.eventId)
    return attendee
  }

  async unattend(userId, attendeeId) {
    const attendee = await dbContext.Attendees.findById(attendeeId)
    if (attendee.accountId.toString() !== userId) {
      throw new Forbidden('You Cannot Cancel For Someone Else')
    }
    await dbContext.Attendees.findByIdAndDelete(attendeeId)
    await commentsService.toggleCreatorAttending(userId, false)
    await eventsService.unattend(attendee.eventId)
  }
}
export const attendeesService = new AttendeesService()
