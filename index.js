const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4444;
const { graphql } = require('graphql');
const generator = require('./generator/generator');
const cors = require('cors')


app.use(bodyParser.json());
app.use(cors());

app.get('/schema', (req, res) => {
    res.send('Get raw schema');
})

app.post('/graphql', (req, res) => {
    let query = req.body.query;
    const schema = generator(req.query.tenant);

    graphql(schema.schema, query, schema.root).then(response => {
        res.send(response);
    }).catch(err => {
        console.error(err);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

