import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"
import { eventService } from "./EventService"

class AttendeesService {
    async attend(eventId, accountId) {
        const body = {
            eventId: eventId
        }
        const res = await api.post('api/attendees', body)
        logger.log(res.data)
        AppState.activeEvent.capacity--
        eventService.getAttendees(eventId)
        accountService.getAttendance(accountId)
    }
    async unattend(id, eventId) {
        const res = await api.delete('api/attendees/' + id)
        logger.log('unattended')
        accountService.getAttendance()
        eventService.getAttendees(eventId)
        AppState.activeEvent.capacity++
    }
}
export const attendeesService = new AttendeesService()