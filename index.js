import express from 'express'
import pg from 'pg'
const app = express()
const port = 3000
const {Pool} = pg

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Mahasiswa',
    password: '1138',
    port: 5432
})

// GET ALL
app.get('/', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('SELECT * FROM biodata')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('internal Server Error');
        });
})


// POST (Tambah Data)
app.post('/biodata', (req, res, next) => {
    const { id, nama, nim, kelas } = req.body;

    pool.query(
        'INSERT INTO biodata (id, nama, nim, kelas) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, nama, nim, kelas]
    )
        .then(result => res.json(result.rows[0]))
        .catch(err => console.error(err));
});





app.listen(port, () => {
    console.log(`App running on ${port}.`);
});