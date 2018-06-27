const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
  
const app = express();

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static folder
app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('contact');

});
app.post('/send',(req,resp)=>{
const output = `
<p>You have a new contact person</p>
<h3><Contact Details:>
<ul>
<li>firstName:${req.body.firstName}</li>
<li>lastName:${req.body.lastName}</li>
<li>emailAddress:${req.body.emailAddress}</li>
<li>cityName:${req.body.cityName}</li>
<li>state:${req.body.stateName}</li>
<li>zip:${req.body.zip}</li>
</ul>
`;

// let transporter = nodemailer.createTransport({
//     host: 'mail.traversymedia.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'test@test.com', // generated ethereal user
//         pass: 'test1234' // generated ethereal password
//     },
//     tls:{
//         rejectUnauthorized:false
//     }

// });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'bhagyashreep8@gmail.com',
           pass: 'bhagyashreepani94'
       }
   });

// setup email data with unicode symbols
let mailOptions = {
    from: '"UserDetails" <bhagyashreep8@gmail.com>', // sender address
    to: 'bhagyashreep8@gmail.com', // list of receivers
    subject: 'UserDetails', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render('contacts',{msg:'form has been sent successfully'});
});
});
app.listen(8082,()=>console.log('server starting.....'));