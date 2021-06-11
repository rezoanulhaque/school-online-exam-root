const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdb7s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const classnineqbCollection = client.db(`${process.env.DB_NAME}`).collection("classnineqb");
  const classeightqbCollection = client.db(`${process.env.DB_NAME}`).collection("classeightqb");
  const classsevenqbCollection = client.db(`${process.env.DB_NAME}`).collection("classsevenqb");
  const classsixqbCollection = client.db(`${process.env.DB_NAME}`).collection("classsixqb");
  const classelevenqbCollection = client.db(`${process.env.DB_NAME}`).collection("classelevenqb");
  const classfiveqbCollection = client.db(`${process.env.DB_NAME}`).collection("classfiveqb");
  const classfourqbCollection = client.db(`${process.env.DB_NAME}`).collection("classfourqb");
  const classthreeqbCollection = client.db(`${process.env.DB_NAME}`).collection("classthreeqb");
  const classtwoqbCollection = client.db(`${process.env.DB_NAME}`).collection("classtwoqb");
  const classoneqbCollection = client.db(`${process.env.DB_NAME}`).collection("classoneqb");
  const examQuestionCollection = client.db(`${process.env.DB_NAME}`).collection("examQuestion");
  const teacherCollection = client.db(`${process.env.DB_NAME}`).collection("teacher");
  const studentCollection = client.db(`${process.env.DB_NAME}`).collection("student");
 
  app.get('/teacher', (req, res) => {
    const userEmail = req.query.email;
    teacherCollection.find({ email: userEmail })
        .toArray((err, result) => res.send(result))
})
app.get('/existingUser', (req, res) => {
  const userEmail = req.query.email;
  studentCollection.find({ email: userEmail })
    .toArray((err, result) => res.send(result))
})
app.post('/addNewUser', (req, res) => {
  const addShipment = req.body
  studentCollection.insertOne(addShipment)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.patch('/updatedInfo', (req, res) =>{
  const userEmail = req.query.email
  studentCollection.updateOne({email: userEmail},
  {
    $set: {grade: req.body.grade, 
      rollno: req.body.rollno
  }
  })
  .then(result =>{
    res.send(result.modifiedCount > 0)
  })
})
app.post('/addNewQuestionToHsc', (req, res) => {
  const addQuestion = req.body
  classelevenqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToSsc', (req, res) => {
  const addQuestion = req.body
  classnineqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToJsc', (req, res) => {
  const addQuestion = req.body
  classeightqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToSeven', (req, res) => {
  const addQuestion = req.body
  classsevenqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToSix', (req, res) => {
  const addQuestion = req.body
  classsixqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToFive', (req, res) => {
  const addQuestion = req.body
  classfiveqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToFour', (req, res) => {
  const addQuestion = req.body
  classfourqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToThree', (req, res) => {
  const addQuestion = req.body
  classthreeqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToTwo', (req, res) => {
  const addQuestion = req.body
  classtwoqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.post('/addNewQuestionToOne', (req, res) => {
  const addQuestion = req.body
  classoneqbCollection.insertOne(addQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.get('/getQuestionFromHsc', (req, res) => {
  const subjectName = req.query.subject
  classelevenqbCollection.find({subject : subjectName})
  .toArray((err, documents) => {
    res.send(documents)
  })
})
app.delete('/deleteSingleQuestionFromHsc/:id', (req, res) =>{
  const id=req.params.id
  classelevenqbCollection.deleteOne({_id: ObjectId(id)})
  .then(result => 
    res.send(result.deletedCount > 0))
})
app.post('/submitQuestions', (req, res) => {
  const submitQuestion = req.body
  examQuestionCollection.insertOne(submitQuestion)
      .then(result => res.send(result.insertedCount > 0 ))
})
app.get('/takeExam', (req, res) => {
  const className = req.query.grade
  examQuestionCollection.find({grade : className})
  .toArray((err, documents) => {
    res.send(documents)
  })
})
app.patch('/updatedResult', (req, res) =>{
  const objectId = req.query.id
  examQuestionCollection.updateOne({_id: ObjectId(objectId)},
  {
    $push: { "result": {email: req.body.email,
    rollno: req.body.rollno,
    marks: req.body.marks}}
  })
  .then(result =>{
    res.send(result.modifiedCount > 0)
  })
})
app.get('/getResultByTeacher', (req, res) => {
  const teacherEmail = req.query.teacher
  examQuestionCollection.find({teacher : teacherEmail})
  .toArray((err, documents) => {
    res.send(documents)
  })
})
app.get('/fillupStudentsIdentity', (req, res) => {
  studentCollection.find()
  .toArray((err, documents) => {
    res.send(documents)
  })
})
  
});

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("connected")
})

app.listen(process.env.PORT || port);