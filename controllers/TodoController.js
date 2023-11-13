// controllers/TodoController.js
const { Todo } = require('../models');

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });

    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title;
    todo.description = description;
    await todo.save();

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAll = async (req, res) => {
  try {
    await Todo.destroy({ where: {} });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { create, getAll, getById, update, deleteTodo, deleteAll };
