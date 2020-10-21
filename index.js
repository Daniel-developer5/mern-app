const 
    express = require('express'),
    mongoose = require('mongoose'),
    URI = require('./config'),
    FoodModel = require('./models/Food'),
    cors = require('cors'),
    path = require('path')

const 
    app = express(),
    PORT = process.env.PORT || 8080

app.use(express.json())

app.use(cors())

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => err ? res.send(err) : res.send(result))
})

app.post('/insert', async (req, res) => {
    const { foodName, days } = req.body

    const food = new FoodModel({
        foodName: foodName,
        daysSinceIAte: days
    })

    try {
        await food.save()

        res.send('Inserted Data')
    } catch(err) {
        console.log(err)
    } 
})

app.put('/update', async (req, res) => {
    const { newFoodName, id } = req.body

    try {
        await FoodModel.findById(id, (err, updateFood) => {
            updateFood.foodName = newFoodName
            updateFood.save()
        })

        res.send('update')
    } catch(err) {
        console.log(err)
    } 
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    await FoodModel.findByIdAndRemove(id).exec()

    res.send(`deleted: ${id}`)
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))