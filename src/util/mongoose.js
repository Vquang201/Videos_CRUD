module.exports = {
    // Đưa về object 1 list in DB (do bảo mật của handlebar)
    mutipleMongooseToObject: mongoose => mongoose.map(mongoose => mongoose.toObject()),
    // chỉ 1 record 
    mongooseToObject: mongoose => mongoose ? mongoose.toObject() : mongoose
}