const Post = require('../models/Post')

class LikeController {
    async store(req, res) {
        const post = await Post.findById(req.params.id)


        post.set({ likes: post.likes + 1 });

        await post.save();


        return res.json(post)

    }
}

module.exports = new LikeController()