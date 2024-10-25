import express from 'express';
import patientService from '../services/patientService';
import toNewPersonEntry from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPersonEntry = toNewPersonEntry(req.body);
    const addedEntry = patientService.addPatient(newPersonEntry);
    res.json(addedEntry);
  } catch (error: unknown) {

    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;