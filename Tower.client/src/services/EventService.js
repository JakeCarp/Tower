import { AppState } from "../AppState"
import {  AttendeeAccount } from "../models/Attendee"
import { Comment } from "../models/Comment"
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

    async getById(id) {
        const res = await api.get('/api/events/' + id)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }
    async createEvent(eventData) {
        const res = await api.post('/api/events', eventData)
        logger.log(res.data)
        AppState.events.unshift(new Event(res.data))
        AppState.activeEvent = res.data.id
    }

    async editEvent(eventData) {
        const index = AppState.events.indexOf(e => e.id === eventData.id)
        const update = await api.put('/api/events/' + eventData.id, eventData)
        logger.log(update)
        AppState.activeEvent = new Event(update.data)
        AppState.events = AppState.events.splice(index, 1, new Event(update.data))
        
    }

    async cancelEvent(id) {
        const res = await api.delete('/api/events/' + id)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }
    async getAttendees(id) {
        const res = await api.get('api/events/' + id + '/attendees')
        logger.log(res.data)
        AppState.attendees = res.data.map(a => new AttendeeAccount(a))
    }

    async getComments(id) {
        const res = await api.get('api/events/' + id + '/comments')
        logger.log(res.data)
        AppState.comments = res.data.map(c => new Comment(c))
    }
   
}

export const eventService = new EventService()