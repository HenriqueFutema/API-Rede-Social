const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

PostSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Post', PostSchema)