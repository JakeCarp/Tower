import { AppState } from '../AppState'
import { Attendee, AttendeeEvent } from '../models/Attendee'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAttendance(s) {
    try {
      const res = await api.get('/account/attendees')
      logger.log(res.data)
      AppState.accountAttendance = res.data.map(a => new AttendeeEvent(a))
    } catch (error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
