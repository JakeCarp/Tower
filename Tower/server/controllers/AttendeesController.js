import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attend)
      .delete('/:id', this.unattend)
  }

  async attend(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attend = await attendeesService.createAttendee(req.body)
      return res.send(attend)
    } catch (error) {
      next(error)
    }
  }

  async unattend(req, res, next) {
    try {
      const userId = req.userInfo.id
      const attendeeId = req.params.id
      await attendeesService.unattend(userId, attendeeId)
      res.send('Attendance Canceled!')
    } catch (error) {
      next(error)
    }
  }
}
