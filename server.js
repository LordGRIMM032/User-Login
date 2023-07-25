//import all dependencies
const express = require('express');
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { render } = require('ejs');

//create an express.js app
const app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;


//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());




// a variable to save a session
var session;

// set the view engine to ejs
app.set('view engine', 'ejs');


//set express for accepting POST actions
app.use(express.urlencoded({ extended: 'false' }))
app.use(express.json())

//create mysql connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login-db"
});

//connect to the db
db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})




// use res.render to load up an ejs view file

// login form
app.get('/', function (req, res) {
    res.redirect('/login');
});



app.get('/login', function (req, res) {
    res.render('pages/login');
})

app.get('/register', function (req, res) {
    res.render('pages/register');
})

app.get('/home', (req,res) => {
    res.render('pages/home');
})

//logout function
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.locals.userid = undefined;
    // console.log(res.locals.userid);
    login_status = 0;
    res.redirect('/login');
});

app.get('/addUser', function (req, res) {
    res.render('pages/addUser');
})



//authorization of user registration
app.post("/auth/register", (req, res) => {
    console.log("posted");
    const { username, email, password, confirm_password } = req.body;


    // db.query() code goes here
    db.query('SELECT email FROM `login-db`.`users` WHERE email = ?', [email], async (error, result) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }

        //check for records
        if (result.length > 0) {
            console.log('This email is already in use');
            return res.redirect('/login');
        }

        //password verification
        else if (password !== confirm_password) {
            console.log('Passwords do not match!');
            return res.redirect('/login');
        }
        db.query('INSERT INTO users SET?', { name: username, email: email, password: password }, (err, result) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log('User registered!');
                login_status = 1;
                res.redirect('/home');


            }
        })
    })

})



//authorization of user login
app.post("/auth/login", (req, res) => {
    console.log("posted");
    let { username, password } = req.body;


    // db.query() code goes here
    db.query('SELECT password FROM `login-db`.`users` WHERE name = ?', [username], async (error, result) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }

        //check for records
        if (result.length > 0) {

            //password verification
            if (password !== result[0].password) {
                console.log('Wrong passwords!');
                return res.redirect('/login');
            }
            else {
                session = req.session;
                session.userid = username;
                res.locals.userid = username;
                console.log('welcome ', username);
                login_status = 1;
                res.redirect('/home');

            }
        }
        else {
            console.log('no user found, please register.');
            return res.redirect('/register');
        }
    })

})

app.get('/user', function (req, res) {
    // session = req.session;
    // if (session.userid) {
    db.query('SELECT * FROM `login-db`.`users`', async (error, result1) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }

        var value;

        if (login_status == 0) {
            value = false;
        }
        else if (login_status == 1) {
            value = true;
        }

        res.render('pages/user', {
            userValues: result1,
            status: value
        })

    })
    // }

})

app.get("/update", (req, res) => {
    db.query('SELECT id,name,email FROM `login-db`.`users` WHERE id = ?', [req.query.id], async (error, result) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }

        //check for records
        if (result.length > 0) {
            res.render('pages/update', { userdetails: result });
        }
    })
})

app.get("/remove", (req, res) => {
    db.query('DELETE FROM `login-db`.`users` WHERE `id`= ?', [req.query.id], async (error, result) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }
        else {
            console.log('deleted 1 record');
            res.redirect('/user');
        }
    })
})

app.post("/user/update", (req, res) => {
    login_status = 1;
    let userid = req.query.id;

    let { username, email, password, confirm_password } = req.body;

    console.log(username, email, password, confirm_password);
    if (password == confirm_password) {
        db.query("UPDATE `login-db`.`users` SET `name`='" + username + "',`email`='" + email + "',`password`='" + password + "' WHERE `id`='" + userid + "';", (err, result) => {

            console.log('User updated!');

        })
        res.redirect('/user');
    }
    else {

        console.log('password does not match');
        res.redirect('/user');

    }


})

//set view port
app.listen(3000);

app.use(express.static('public'));


console.log('Server is listening on port 3000');