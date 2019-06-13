const Comment = require('../models/Comment')

class CommentController {

    async store(req, res) {
        const comment = await Comment.create({...req.body, post: req.params.id, author: req.userId })

        return res.json(comment)
    }

    async show(req, res) {
        const comments = await Comment.find({ post: req.params.id })

        return res.json(comments)
    }

    async destroy(req, res) {
        const comment = await Comment.findByIdAndDelete(req.params.id)

        return res.json(comment)
    }

}


module.exports = new CommentController()