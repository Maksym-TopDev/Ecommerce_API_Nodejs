const mongoose = require("mongoose");

const dbConnection =() =>{
mongoose.connect(process.env.DB_URL).then((conc)=>{
    console.log('Database Connected Successfully', conc.connection.host);
    
})

// .catch((err)=>{
//     console.log(err);
//     process.exit(1);
// })
}

module.exports = dbConnection