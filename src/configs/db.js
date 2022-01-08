const mongoose=require('mongoose');

const connect =()=>{
    return mongoose.connect('mongodb+srv://cultfitTeam:cultfitTeam11@cluster0.tmjut.mongodb.net/test');
}

module.exports =connect;