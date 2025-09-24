import patientEntries from '../data/patients';
import { PatientSafe, NewPatient, Patient, NewEntry, Entry } from '../types';

import { newPatientSchema } from '../utils';

import { v4 as uuid } from 'uuid';

const getAll = (): PatientSafe[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getOne = (id: string): Patient => {
  const patient = patientEntries.find((p) => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const addPatient = (entry: NewPatient): PatientSafe => {
  const parsed = newPatientSchema.parse(entry);
  const patient: Patient = { ...parsed, id: uuid(), entries: [] };
  patientEntries.concat(patient);
  return patient;
};

const addEntry = ({
  patientId,
  entry,
}: {
  patientId: string;
  entry: NewEntry;
}) => {
  const patientToChange = patientEntries.find((p) => p.id === patientId);
  if (!patientToChange) {
    throw new Error('Patient not found');
  }

  const newEntry: Entry = { ...entry, id: uuid() };
  patientToChange.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  addPatient,
  getOne,
  addEntry,
};
