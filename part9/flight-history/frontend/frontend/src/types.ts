export const weathers = [
  'sunny',
  'rainy',
  'cloudy',
  'stormy',
  'windy',
] as const;
export type Weather = (typeof weathers)[number];

export const visibilities = ['great', 'good', 'ok', 'poor'] as const;
export type Visibility = (typeof visibilities)[number];

export interface NewDiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
