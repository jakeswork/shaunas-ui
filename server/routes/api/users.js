const User = require('../../models/User');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://shaunasbabyshower:ShaunasBabyShower@ds247499.mlab.com:47499/shaunas-babyshower'

module.exports = (app) => {
	app.use(bodyParser.json())

	app.get('/api/users/grab', function (req, res, next) {
		MongoClient.connect(url, function(err, client) {
			assert.equal(null, err)
			const db = client.db('shaunas-babyshower')
			const collection = db.collection('users')
			collection.find().toArray(function(err, docs){
				assert.equal(err, null)
				res.send(JSON.stringify({docs}))
			})
			client.close()
		})

  })

};
