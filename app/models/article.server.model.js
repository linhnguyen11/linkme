var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId,
    config = require('../../config/config.js'),
    autoIncrement = require('mongoose-auto-increment'),
    connection = mongoose.createConnection(config.db);
autoIncrement.initialize(connection);
var ArticleSchema = new Schema({
    _id: Number,
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    imageurl: String,
    deleteurl: String,
    category: {
        type: String,
        enum: ['typography','illustration','photography']
    },
    creator: {
        type: Number,
        ref: 'User'
    }
});
ArticleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    startAt: 1
});
mongoose.model('Article', ArticleSchema);