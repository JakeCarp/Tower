import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getAll(query = {}) {
    const page = query.page || 1
    delete query.page
    const totalPages = Math.ceil(await dbContext.Events.count() / 20)
    const events = await dbContext.Events.find(query).populate('creator').limit(20).skip((page - 1) * 20)
    return { results: events, page, totalPages }
  }

  async getById(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) {
      throw new BadRequest('This Event Does Not Exist!')
    }
    return event
  }

  async create(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    return event
  }

  async update(eventData) {
    const event = await this.getById(eventData.id)
    if (event.creatorId.toString() !== eventData.creatorId) {
      throw new Forbidden('This Is Not Your Event')
    } else if (event.isCanceled) {
      throw new BadRequest('You Cannot Edit a Canceled Event')
    }
    const update = await dbContext.Events.findOneAndUpdate({ _id: eventData.id }, eventData, { new: true })
    return update
  }

  async attend(eventId) {
    const event = await this.getById(eventId)
    event.capacity--
    if (event.capacity < 0) {
      throw new BadRequest('This Event is Full')
    }
    await dbContext.Events.findOneAndUpdate({ _id: eventId }, event, { new: true })
  }

  async unattend(eventId) {
    const event = await this.getById(eventId)
    event.capacity++
    await dbContext.Events.findOneAndUpdate({ _id: eventId }, event, { new: true })
  }

  async cancel(eventId, userId) {
    const event = await this.getById(eventId)
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden('This Is Not Your Event')
    }
    const cancel = await dbContext.Events.findOneAndUpdate({ _id: eventId, creatorId: userId }, { isCanceled: true }, { new: true })
    return cancel
  }
}

export const eventsService = new EventsService()
