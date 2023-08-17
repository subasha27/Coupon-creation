const nodemailer = require("nodemailer");
const userDetail = require("../Controller/function")
const dotenv = require('dotenv')
dotenv.config();

const sendEmail = async (mail,couponDat) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.myMail,
        pass: process.env.mailPass
      }
    }); 

    var mailOptions = {
      from: process.env.myMail,
      to: mail,
      subject: 'Coupon Creation',
      text: `Coupon Created Successfully!`
    };
    transporter.sendMail(mailOptions, function(err, data) {
      if(err) {
          console.log('Error Occurs',err);
      } else {
          console.log('Email sent successfully');
      }
    });
}

  module.exports={
    sendEmail
  }