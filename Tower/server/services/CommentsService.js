import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async getAll(query) {
    const comments = await dbContext.Comments.find(query)
      .populate('event')
      .populate('creator')
    return comments
  }

  async toggleCreatorAttending(accountId, attendBool) {
    const update = { creatorIsAttending: attendBool }
    await dbContext.Comments.updateMany({ creatorId: accountId }, update)
  }

  async create(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    if (!comment) {
      throw new BadRequest('thing')
    }
    await comment.populate('creator')
    await comment.populate('event')
    return comment
  }

  async remove(userId, commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your comment')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}
export const commentsService = new CommentsService()
