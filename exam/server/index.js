const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middleware');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(cors({ origin: 'http://localhost:5173' }));

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'exam_schema',
};

const guestSchema = Joi.object({
  firstName: Joi.string().lowercase().required(),
  lastName: Joi.string().lowercase().required(),
  age: Joi.number().integer().min(1).max(100).required(),
  email: Joi.string().email().trim().lowercase().required(),
});

const userSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

server.get('/', authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).send('loged in!');
});

server.post('/register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await dbPool.execute(
      `
              INSERT INTO user (name, email, password)
              VALUES (?,?,?)`,
      [payload.name, payload.email, hashedPassword]
    );
    const token = jwt.sign(
      {
        email: payload.email,
        id: response.insertId,
        name: payload.name,
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

server.post('/login', async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }
  try {
    const [data] = await dbPool.execute(
      `
            SELECT * FROM user
           WHERE email=?
            `,
      [payload.email]
    );
    if (!data.length) {
      return res
        .status(400)
        .send({ error: 'Email or password did not match ' });
    }
    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email: data[0].email,
          id: data[0].id,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).send({ token });
    }
    return res.status(400).send({ error: 'Email or password did not match' });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.get('/guests', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const [data] = await dbPool.execute(
      `
            SELECT * FROM guests
            WHERE user_id=?
            `,
      [userId]
    );
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

server.post('/guests', authenticate, async (req, res) => {
  let payload = req.body;

  try {
    payload = await guestSchema.validateAsync(payload);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const [result] = await dbPool.execute(
      `
          INSERT INTO guests (firstName, lastName, age, email, user_id)
          VALUES (?,?,?,?,?)`,
      [
        payload.firstName,
        payload.lastName,
        payload.age,
        payload.email,
        req.user.id,
      ]
    );
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: 'Guest added succesfully.' });
    } else {
      return res.status(500).json({ error: 'Failed to add guest' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add guest' });
  }
});

server.put('/guests/:id', authenticate, async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    const [guestData] = await dbPool.execute(
      `
        SELECT * FROM guests
        WHERE id = ? AND user_id = ?
      `,
      [id, userId]
    );

    if (!guestData.length) {
      return res.status(404).json({ message: 'Guest not found.' });
    }

    await dbPool.execute(
      `
        UPDATE guests
        SET firstName = ?,
            lastName = ?,
            age = ?,
            email = ?
        WHERE id = ? AND user_id = ?
      `,
      [
        payload.firstName,
        payload.lastName,
        payload.age,
        payload.email,
        id,
        userId,
      ]
    );

    res.status(200).json({ message: 'Guest data is updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update guest data.' });
  }
});

server.delete('/guests/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const [guestData] = await dbPool.execute(
      `
        SELECT * FROM guests
        WHERE id = ?
      `,
      [userId, id]
    );

    if (!guestData.length) {
      return res.status(404).json({ error: 'Guest not found.' });
    }
    await dbPool.execute(
      `
        DELETE FROM guests
        WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({ message: 'Guest deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete guest.' });
  }
});
server.listen(process.env.PORT, () =>
  console.log(`server is running on Port ${process.env.PORT}`)
);
