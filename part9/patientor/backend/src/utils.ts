import { Gender, HealthCheckRating, NewEntry, Diagnosis } from './types';
import z from 'zod';

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const newPatientSchema = z.object({
  gender: z.enum(Gender),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  occupation: z.string(),
  ssn: z.string(),
});

export const newHospitalEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const newHealthCheckEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const newOccupationalHealthcareEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const parseNewEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== 'object' || !('type' in entry)) {
    throw new Error('something is wrong with entry');
  }

  if (!('diagnosisCodes' in entry)) {
    throw new Error('missing diagnosisCodes');
  }

  switch (entry.type) {
    case 'HealthCheck':
      return newHealthCheckEntrySchema.parse(entry);
    case 'Hospital':
      return newHospitalEntrySchema.parse(entry);
    case 'OccupationalHealthcare':
      return newOccupationalHealthcareEntrySchema.parse(entry);
    default:
      throw new Error('no type match');
  }
};

export default {
  newPatientSchema,
  newHospitalEntrySchema,
  newHealthCheckEntrySchema,
  newOccupationalHealthcareEntrySchema,
  parseNewEntry,
};
