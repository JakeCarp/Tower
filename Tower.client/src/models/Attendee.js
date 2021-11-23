export class Attendee {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
    }
}

export class AttendeeEvent extends Attendee {
    constructor(data) {
        super(data)
        this.eventId = data.event.id
        this.name = data.event.name
        this.description = data.event.description
        this.coverImg = data.event.coverImg
        this.location = data.event.location
        this.capacity = data.event.capacity
        this.startDate = data.event.startDate
        this.isCanceled = data.event.isCanceled
        this.type = data.event.type
        this.creatorId = data.event.creatorId
        this.creator = data.event.creator
    }
}

export class AttendeeAccount extends Attendee {
    constructor(data) {
        super(data)
        this.accountId = data.account.id
        this.picture = data.account.picture
        this.name = data.account.name
    }
}