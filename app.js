// alert('h')
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
// const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.listen(8080, function(){
    console.log("Server started at port 8080");
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);
    // console.log(jsonData)


    let URL = 'https://us6.api.mailchimp.com/3.0/lists/4213e80b09';
    let options = {
        method: 'POST',
        auth: 'KiranDon:6253e3f8c6a054c4d8273d54166722aa-us6'
    };
    let request = https.request(URL, options, function(response){
        response.on('data', function(data){
            // console.log(JSON.parse(data));
        })
        console.log(response.statusCode)
        if(response.statusCode===200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
    });
    request.write(jsonData);
    request.end();

})

app.post('/failure', (req, res)=>{
    res.redirect('/')
})
// mailchimp api : 6253e3f8c6a054c4d8273d54166722aa-us6 id: 4213e80b09