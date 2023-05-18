const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_delete = require('mongoose-delete');

//tạo lược đồ
const Demo = new Schema({
    name: { type: String, default: '', minLength: 1, maxLength: 255 },
    description: { type: String, maxLength: 500 },
    videoId: { type: String },
    image: { type: String },
    videoType: { type: String },
    slug: { type: String, slug: 'name', unique: true }
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


// Plugin 
mongoose.plugin(slug)
Demo.plugin(mongoose_delete)
// ghi đè lại các method (find , findOne , count)
Demo.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true })


module.exports = mongoose.model('Demoo', Demo)