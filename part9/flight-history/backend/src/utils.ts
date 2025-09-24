import { Weather, Visibility } from './types';
import z from 'zod';

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional(),
});

export default NewEntrySchema;
