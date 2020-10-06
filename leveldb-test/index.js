var level = require('level')
var sublevel = require('level-sublevel')

var db = level('./db')

// db.put('animal', 'bear', function (err) {
//   //this point animar = bear
// })

// db.del('animal', function(err){
//   db.get('animal', function(err, animal){
//     console.log(animal)
//   })
// })

db.get('animal', function(err, animal){
    console.log(animal)
  })

// db.put('animal', {type:'grizzly', name: 'steve'}, function(err){
//   db.get('animal', function(err, animal){
//     console.log(animal.name)
//   })
// })


// var db = sublevel('./db', {valueEncoding: 'json'})
//
// var bearsdb = db.sublevel('bears')
// var regionsdb = db.sublevel('regions')
//
// regionsdb.put('northamerica', {name: 'North America'}, function(err)
// {
//   bearsdb.put('steve', {type: 'grizzly', region: 'northamerica'}, function(){
//
//   })
// })
