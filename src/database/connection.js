const mongoose = require('mongoose');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const banco = process.env.DB_DATABASE;

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.miauz.mongodb.net/${banco}?retryWrites=true&w=majority`,
{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;