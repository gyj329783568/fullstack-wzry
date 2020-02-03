const express = require('express')

const app = express()

// token应该放到环境变量秘钥
app.set('secret', '1y28e9hajd')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
  console.log('3000')
})
