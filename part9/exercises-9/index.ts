import express from 'express';
import { bmiCalc } from './bmiCalculator';
import { calcExerciseHours } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!weight || !height) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = bmiCalc(height, weight);

  res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'Missing paramters' });
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  if (Number.isNaN(target) || !(target instanceof Number)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  res.json(calcExerciseHours(Number(target), daily_exercises as number[]));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
