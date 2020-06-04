let express = require('express');
let bodyParser = require('body-parser');
let app = express();


//using body parser
let urlencodedParser = bodyParser.urlencoded({extended:false});
//set view engine
app.set('view engine', 'ejs');

// setting middleware
app.use('/assets', express.static('assets'));

//routing
app.get('/', (req, res) => {
    res.send('this is the homepage');
});

app.get('/contact', (req, res) => {
    console.log(req.query);
    res.send('this is the contact page');
});

app.get('/profile/:id/name/:name', (req, res) => {
    res.send("profile with id " + req.params.id + ' has a name '+ req.params.name);
});

//sending dynamic pages
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html'); 
});


//using templating engines
app.get('/template_page/:name', (req, res) => {
    let data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
    res.render('pages/profile', {person: req.params.name, data:data});
});

//using templating engines
app.get('/display', (req, res) => {
    res.render('pages/success', {person: req.query});
});

app.get('/contact-us', (req, res) => {
    res.render('pages/contact', {qs:req.query});
});

app.post('/form-send', urlencodedParser, (req, res) => {
    res.render('pages/forms_display', {formData: req.body})
  
});


app.listen(3000, '127.0.0.1');
console.log("Server listening on port 3000");