import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/attendees', this.getAttendees)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.cancel)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const events = await eventsService.getAll(query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await eventsService.getById(req.params.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getAttendees(req, res, next) {
    try {
      const query = { ...req.query, eventId: req.params.id }
      const attendees = await attendeesService.getAll(query)
      res.send(attendees)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const query = { ...req.query, eventId: req.params.id }
      const comments = await commentsService.getAll(query)
      res.send(comments)
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      req.body.isCanceled = false
      const event = await eventsService.update(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      const userId = req.userInfo.id
      const eventId = req.params.id
      const event = await eventsService.cancel(eventId, userId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}
