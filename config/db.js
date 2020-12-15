const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected: ' +conn.connection.host )
        var connection = mongoose.createConnection(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        autoIncrement.initialize(mongoose.connection)

    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB