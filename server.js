const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/attendance')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));

// Define your routes here
const Student = require('./student');

app.post('/student', async (req, res) => {
  const student = new Student({
    name: req.body.name
  });
  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

app.put('/student/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send('The student with the given ID was not found.');
  student.attendance = req.body.attendance;
  await student.save();
  res.send(student);
});

app.delete('/student/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send('The student with the given ID was not found.');
  res.send(student);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));