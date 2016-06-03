var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId,
    config = require('../../config/config.js'),
    autoIncrement = require('mongoose-auto-increment'),
    connection = mongoose.createConnection(config.db);
autoIncrement.initialize(connection);
var NewSchema = new Schema({
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
        enum: ['Ăn Gì','Đi Đâu','Yêu Ai','Khỏe Đẹp','Đời Sống','Vui Nhé','Hóng ShowBiz','Clip']
    },
    creator: {
        type: Number,
        ref: 'User'
    }
});
NewSchema.plugin(autoIncrement.plugin, {
    model: 'New',
    startAt: 1
});
mongoose.model('New', NewSchema);