import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async createComment(commData) {
        const res = await api.post('/api/comments', commData)
        logger.log(res.data)
        AppState.comments.unshift(new Comment(res.data))
    }
    async removeComment(id) {
        const res = await api.delete('/api/comments/' + id)
        logger.log(res)
        AppState.comments = AppState.comments.filter(c => c.id != id)
    }
}

export const commentsService = new CommentsService()