const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const twig = require('twig');

//Настройки базы данных
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const url = "mongodb://localhost:27017/pets";

const app = express();

// view engine setup
app.set("twig options", {strict_variables: false});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.route("/")
    /* GET userlist. */
    .get((req, res) => {
        mongoClient.connect(url, (err, db) => {
            if(err) return console.log(err);
            db.collection('users').find((err, cursor) => {
                if(err) return console.log(err);
                cursor.toArray((err, users) => {
                    res.render('index.twig', { title: 'Users', users: users });
                    db.close();
                });
            });
        });
    })
    /* POST new user */
    .post((req, res) => {
        mongoClient.connect(url, (err, db) => {
            if(err) return console.log(err);
            req.body.pets = [];
            if(req.body && req.body.name){
                db.collection('users').insertOne(req.body).then(results => {
                  res.redirect('/');
                  db.close();
                });
            };
        });
    });

/* DELETE  user */
app.delete("/delete/:id", (req, res) => {
    mongoClient.connect(url, (err, db) => {
        db.collection('users').deleteOne({"_id": ObjectId(req.params.id)}).then((err) => {
            db.collection('users').find((err, cursor) => {
                cursor.toArray((err, users) => {
                    res.render('index.twig', { title: 'Users', users: users });
                    db.close();
                });
            });
        });
    });
});

/* GET pets listing. */
app.route('/pets/:_id')
        /* GET petlist. */
        .get((req, res) => {
            mongoClient.connect(url, (err, db) => {
                if(err) return console.log(err);
                db.collection('users').findOne({"_id": ObjectId(req.params._id)}).then((info) => {
                    res.render('pets.twig', { title: 'Pets', user: info });
                }).then(() => {
                    db.close();
                });
            });
        })
        /* POST new pet */
        .post((req, res) => {
            mongoClient.connect(url, (err, db) => {
                if(err) return console.log(err);
                let collection = db.collection('users');
                let _id = ObjectId(req.params._id);
                collection.findOne({_id}).then((info) => {
                    if(req.body && req.body.name){
                        let pets = info.pets.slice();
                        pets.push(req.body.name);
                        collection.findOneAndUpdate(
                            // критерий выборки
                            {_id}, 
                            // параметр обновления
                            {$set: {pets}}
                        );
                    };
                }).then(() => {
                    res.redirect(`/pets/${req.params._id}`);
                    db.close();
                });
            });
        });

/* DELETE  pet */
app.delete("/pets/:id/:arrNum", (req, res) => {
    mongoClient.connect(url, (err, db) => {
        if(err) return console.log(err);
        let collection = db.collection('users');
        let _id = ObjectId(req.params.id);
        collection.findOne({_id}).then((info) => {
            let pets = info.pets.slice();
            pets.splice(req.params.arrNum, 1);
            collection.findOneAndUpdate(
                // критерий выборки
                {_id}, 
                // параметр обновления
                {$set: {pets}}
            );
        }).then(() => {
            res.redirect(`/pets/${req.params._id}`);
            db.close();
        });
    });
});
/* UPDATE  pet */
app.put("/pets/:id/:arrNum/:petName", (req, res) => {
    mongoClient.connect(url, (err, db) => {
        if(err) return console.log(err);
        let collection = db.collection('users');
        let _id = ObjectId(req.params.id);
        collection.findOne({_id}).then((info) => {
            let pets = info.pets.slice();
            pets[req.params.arrNum] = req.params.petName;
            collection.findOneAndUpdate(
                // критерий выборки
                {_id}, 
                // параметр обновления
                {$set: {pets}}
            );
        }).then(() => {
            res.redirect(`/pets/${req.params._id}`);
            db.close();
        });
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
