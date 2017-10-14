require('dotenv').config();


const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      session = require('express-session')
      path = require('path')
      


let app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
//app.use(express.static(path.resolve(__dirname,'../..', 'build')));




app.use(session({
    secret: 'bollywollygang',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(passport.initialize())
app.use(passport.session())


passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done){
    return done(null,profile)
}))


massive({
    host: 'ec2-23-21-197-175.compute-1.amazonaws.com',
    port: 5432,
    database: 'd9p7rftc94n8h6',
    user: 'fcaernkzwkluui',
    password: '584510469c025604c5909d8f66c3f99a2232e124a940f398590c327e9e1117a5',
    ssl: true

}).then(function(db){
    app.set('db',db)
  })






//===============AUTH ENDPOINTS================//



  app.get('/test', (req, res)=>{console.log('testing')})
  
  app.get('/auth', passport.authenticate('auth0'));
  
  app.get('/auth/callback', passport.authenticate('auth0',{
      successRedirect: 'http://localhost:3001/#/Home',
      failureRedirect:'http://localhost:3001/'
  }))
  passport.serializeUser(function(user, done) {
      console.log( "first user: ",user)
      done(null,user);
    });
  passport.deserializeUser(function(user,done){
      console.log("second log===" ,user)
      done(null,user)
  })
  app.get('/auth/me', (req, res,next) =>{
      if(!req.user){
          return res.status(404).send("user not found")
      } else{
          console.log(req.user)
          res.status(200).send(req.user)
  
      }
  })

  //=============AUTH END============//




  //==============USER CREDENTIALS===============//
  app.get('/user', (req,res)=>{
      console.log('USER ENDPOINT' + req.user)
      res.status(200).json(req.user)
  })
  app.post('/user', (req,res) =>{
      const {username} = req.body
      req.app.get('db').createUser([username]).then(response =>{
          res.status(200).send(console.log('Success'))
      })
  })
  app.put('/user', (req,res)=>{
      const {id, permission} = req.body
      req.app.get('db').updatePerm([permission, id]).then(response =>{
          res.status(200).send(response)
      })
  })
  app.get('/allUsers', (req,res)=>{
      app.get('db').getAllUsers().then(response =>{
          res.status(200).send(response)
          //console.log('USERS' + response)
      })
  })

  //==========================USER CREDENTIALS END==============================//



  //==========================RESOURCE END POINTS====================//

  app.get('/allTuts', (req,res)=>{
    app.get('db').getAllTypes().then(response =>{
        res.status(200).send(response)
    })
  })
  app.get('/allTuts/:id', (req,res)=>{
      app.get('db').getResourceCount([req.params.id]).then(response=>{
          console.log("here i am" + response)
          res.status(200).send(response)
      })
  })
  app.get('/search',(req, res)=>{
      app.get('db').searchByContent([req.query.search]).then(response =>{
          console.log(req.query.search)
          console.log("query response" + response)
          res.status(200).send(response)
      })
  })
  app.get('/category/:tech', (req,res)=>{
      if(req.params.tech){
          //console.log(req.params)
      app.get('db').getByTech([req.params.tech]).then(response =>{
          //console.log(response)
          let x = response.filter((e)=>{
              if(e.tech === req.params.tech){
                  console.log(e)
                return e
              }
          })
          res.status(200).send(x)
      })}
  })
  app.get('/getNames', (req,res)=>{
      app.get('db').getTypeNames().then(response =>{
      res.status(200).send(response)
    })
  })

  app.post('/allTuts', (req,res)=>{
      const{tech, link, linkdesc,pic, userID} = req.body

      req.app.get('db').insertResource([tech,link,linkdesc,pic, userID]).then(response =>{
          res.status(200).send(console.log('Success'))
      })
      
  })
  app.put('/allTuts/:id', (req,res)=>{
      const { linkdesc} = req.body
      req.app.get('db').updateResource([linkdesc, req.params.id]).then(response=>{
          console.log(response)
          res.status(200).send(response)
      })
  })
  app.delete('/allTuts/:id', (req,res)=>{
         req.app.get('db').deleteResource([req.params.id]).then(response =>{
             res.status(200).send(response)
         })
  })


  app.get('/tutsByUser/:id', (req,res)=>{
      req.app.get('db').tutsByUser([req.params.id]).then(response =>{
          res.status(200).send(response)
      })
  })







  //==========LOG OUT=========///
  app.get('/auth/logout', (req,res,next) =>{
    req.logOut();
    res.status(200).redirect('http://localhost:3001')
})


//+++++++CATCH ALL+++++++++++//
// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });
  


  app.listen(port, ()=>{
      console.log("I'm watchng you Chris")
  })



  