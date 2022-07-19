// create 5 burgers (at least 3 should be beef)
const burgers = [
  { protein: 'beef', cheese: 'true', toppings: ['avocado', 'ketchup', 'egg'] },
  {
    protein: 'turkey',
    cheese: 'true',
    toppings: ['mustard', 'ketchup', 'pickles']
  },
  {
    protein: 'salmon',
    cheese: 'false',
    toppings: ['mayo', 'ketchup', 'sour cream']
  },
  { protein: 'beef', cheese: 'false', toppings: ['bacon', 'egg', 'mayo'] },
  { protein: 'beef', cheese: 'true', toppings: ['onions', 'ketchup', 'bacon'] }
]

db.burgers.insertMany([
  { protein: 'beef', cheese: 'true', toppings: ['avocado', 'ketchup', 'egg'] },
  {
    protein: 'turkey',
    cheese: 'true',
    toppings: ['mustard', 'ketchup', 'pickles']
  },
  {
    protein: 'salmon',
    cheese: 'false',
    toppings: ['mayo', 'ketchup', 'sour cream']
  },
  { protein: 'beef', cheese: 'false', toppings: ['bacon', 'egg', 'mayo'] },
  { protein: 'beef', cheese: 'true', toppings: ['onions', 'ketchup', 'bacon'] }
])

// find all the burgers
db.burgers.find({})

// show just the meat of each burger
db.burgers.find({}, { protein: 1 })

// show just the toppings of each burger
db.burgers.find({}, { toppings: 1 })

// show everything but the cheese
db.burgers.find({}, { protein: 1, toppings: 1 })

// find all the burgers with beef
db.burgers.find({ protein: 'beef' })

// find all the burgers that are not beef
db.burgers.find({ protein: { $ne: 'beef' } })

// find the first burger with cheese
db.burgers.findOne({ cheese: 'true' })

// find one and update the first burger with cheese to have a property of 'double cheese'
db.burgers.updateOne({ cheese: 'true' }, { $set: { cheese: 'double cheese' } })

// find the burger you updated to have double cheese
db.burgers.find({ cheese: 'double cheese' })

// find and update all the beef burgers to be 'veggie'
db.burgers.updateMany(
  { protein: 'beef' },
  { $set: { protein: 'veggie' }, $currentDate: { lastModified: true } }
)

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
db.burgers.deleteOne({ protein: 'veggie' })

// drop the collection
//Expected Output
//true
db.burgers.drop()

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }

db.dropDatabase()
//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database

db.burgers.insertMany([
  { protein: 'beef', cheese: 'true', toppings: ['avocado', 'ketchup', 'egg'] },
  {
    protein: 'turkey',
    cheese: 'true',
    toppings: ['mustard', 'ketchup', 'pickles']
  },
  {
    protein: 'salmon',
    cheese: 'false',
    toppings: ['mayo', 'ketchup', 'sour cream']
  },
  { protein: 'beef', cheese: 'false', toppings: ['bacon', 'egg', 'mayo'] },
  { protein: 'beef', cheese: 'true', toppings: ['onions', 'ketchup', 'bacon'] }
])

// Change the name of the key cheese to 'pumpkinSpice'
db.burgers.updateMany({}, { $rename: { cheese: 'pumpkinSpice' } })

// find all the burgers with ketchup (or another topping you used at least once)
db.burgers.find({ toppings: { $all: ['egg'] } })

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles
db.burgers.updateMany({ toppings: 'egg' }, { $set: { 'toppings.$': '' } })

// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact
db.burgers.updateMany({ protein: 'beef' }, { $push: { toppings: 'egg' } })

//Add a price to each burger, start with $5.00 for each burger
db.burgers.updateMany(
  {},
  {
    $set: { price: '$5' },
    $currentDate: { lastModified: true }
  }
)
