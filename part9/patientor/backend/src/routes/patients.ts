import patientService from '../services/patients';
import express, { Response } from 'express';
import { PatientSafe, Patient } from '../types';
import { newPatientSchema, parseNewEntry } from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<PatientSafe[]>) => {
  res.send(patientService.getAll());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const id = req.params.id;
  if (!id) {
    throw new Error('requires param "id"');
  }
  const patient = patientService.getOne(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

    res.send(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = parseNewEntry(req.body);
    const patientId = req.params.id;
    if (!patientId) {
      res.status(400).send({ error: 'patient not found' });
    }

    const addedEntry = patientService.addEntry({ patientId, entry });
    res.send(addedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
