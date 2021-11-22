import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventService {
    async getAll(query = '') {
        const res = await api.get('/api/events'+ query)
        logger.log(res.data)
        AppState.events = res.data.results.map(e => new Event(e))
        AppState.page = res.data.page
        AppState.totalPages = res.data.totalPages

        if (query !== '') {
            const queries = query.split('&')
            queries.forEach(q => {
                if (q.includes('type')) {
                    let items = q.split('=')
                    AppState.eventFilter = items[1]
                } else {
                    AppState.eventFilter = 'all'
                }
            })
            }
        
    }
    async createEvent(eventData) {
        const res = await api.post('/api/events', eventData)
        logger.log(res.data)
        AppState.events.unshift(new Event(res.data))
    }

    async editEvent(eventData) {
        const index = AppState.events.indexOf(e => e.id === eventData.id)
        const update = await api.put('/api/events/' + eventData.id, eventData)
        AppState.events.splice(index, 1, update)
        
    }
}

export const eventService = new EventService()