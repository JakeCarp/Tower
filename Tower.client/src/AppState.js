import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  events: [],
  activeEvent: {},
  comments: [],
  profile: {},
  page: 0,
  totalPages: 0,
  eventFilter: 'all',
  attendees: [],
  accountAttendance: []
})
