export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.eventId = data.eventId
        this.event = data.event || {}
        this.creatorId = data.creatorId
        this.creator = data.creator || {}
        this.creatorIsAttending = data.creatorIsAttending
    }
}