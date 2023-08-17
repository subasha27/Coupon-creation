const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/Router");
const dotenv =  require("dotenv");


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api',route);



mongoose.connect(
    'mongodb+srv://subash:atlas123@cluster0.yujnvsk.mongodb.net/Coupon?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


const db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',function(){
    console.log('Connected Successfully');
})

const PORT = process.env.PORT||3200;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });  
