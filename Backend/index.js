const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesdb')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// MongoDB Schema for Notes
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Others' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

// CRUD APIs

// Create a new note
app.post('/notes', async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newNote = new Note({
      title,
      description,
      category,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create note' });
  }
});

// Get all notes (with optional filters)
app.get('/notes', async (req, res) => {
  const { searchQuery, category } = req.query;
  try {
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = category;
    }

    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Update a note by ID
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, category, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
