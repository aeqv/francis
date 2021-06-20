//Modules
const mongoose = require('mongoose');

//Connection URI
//const uri = 'mongodb+srv://francisblm:lfbcZap7fJJXIUAc@project.kvxee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const uri = 'mongodb+srv://francismilyer:dZlR7XvABnVBSSeE@project1.kr2df.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Connection DB
async function database() {
    try {
        await mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        console.log('Database is connected');
        
    } catch (err) {
        console.error(err);
    };
};

database(); 
