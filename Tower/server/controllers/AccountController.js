import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/attendees', this.getAttendance)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAttendance(req, res, next) {
    try {
      const query = { ...req.query, accountId: req.userInfo.id }
      const attendace = await attendeesService.getAll(query)
      res.send(attendace)
    } catch (error) {
      next(error)
    }
  }
}
