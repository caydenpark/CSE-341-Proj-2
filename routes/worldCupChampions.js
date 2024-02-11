const router = require('express').Router();
const client = require('../db/connect.js');
const { ObjectId } = require('mongodb');

// Get all World Cup Champions
router.get('/', async (req, res) => {
  try {
    const worldCupChampionsCollection = client.db('cse341Proj2').collection('worldCupChampions');
    const worldCupChampions = await worldCupChampionsCollection.find({}).toArray();
    res.json(worldCupChampions);
  } catch (error) {
    console.error('Error fetching World Cup Champions:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get one World Cup Champion using _id
router.get('/:id', async (req, res) => {
  try {
    const worldCupChampionsCollection = client.db('cse341Proj2').collection('worldCupChampions');
    const worldCupChampion = await worldCupChampionsCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!worldCupChampion) {
      return res.status(404).json({ message: 'World Cup Champion not found' });
    }

    res.json(worldCupChampion);
  } catch (error) {
    console.error('Error fetching World Cup Champion:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new World Cup Champion
router.post('/', async (req, res) => {
  const worldCupChampion = {
    name: req.body.name,
    continent: req.body.continent,
    winCount: req.body.winCount
  };
  try {
    const worldCupChampionsCollection = client.db('cse341Proj2').collection('worldCupChampions');
    const newworldCupChampion = await worldCupChampionsCollection.insertOne(worldCupChampion);
    const newId = newworldCupChampion.insertedId;
    res.status(201).json({ _id: newId });
  } catch (error) {
    console.error('Error creating World Cup Champion:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a World Cup Champion
router.put('/:id', async (req, res) => {
  const worldCupChampion = {
    name: req.body.name,
    continent: req.body.continent,
    winCount: req.body.winCount
  };
  try {
    const worldCupChampionsCollection = client.db('cse341Proj2').collection('worldCupChampions');
    const worldCupChampion = await worldCupChampionsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (!worldCupChampion) {
      return res.status(404).json({ message: 'World Cup Champion not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error updating World Cup Champion:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a World Cup Champion
router.delete('/:id', async (req, res) => {
  try {
    const worldCupChampionsCollection = client.db('cse341Proj2').collection('worldCupChampions');
    const worldCupChampion = await worldCupChampionsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (!worldCupChampion) {
      return res.status(404).json({ message: 'World Cup Champion not found' });
    }
    res.status(200).send();
  } catch (error) {
    console.error('Error deleting World Cup Champion:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
