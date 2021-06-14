const page = require('page')
const pageExpressMapper = require('../page-express-mapper')

// activate express-mapper plugin
const app = pageExpressMapper({
  renderMethod: function (template, model) {
    console.log('template supplied was: ' + template)
    console.log('and the model:')
    console.log(model)
  }
})

// define routes
app.route('/testlink1').get(function (req, res) {
  res.render('someTemplate', { some: 'model' })
})
app.route('/testlink2').get(function (req, res) {
  res.render('someOtherTemplate', { someOther: 'model' })
})
app.route('/testlink3').get(function (req, res) {
  res.render('templateThree', { template: 'three' })
})

// activate router
page()
