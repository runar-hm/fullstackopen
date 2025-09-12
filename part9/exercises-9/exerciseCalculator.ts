type Rating = 1 | 2 | 3;

interface InputValues {
  target: number;
  exerciseHours: number[];
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length < 4)
    throw new Error('Requires at least 2 args: target + hours per day');

  const target = Number(args[2]);
  const exerciseHours = args
    .map((i, idx) => (idx > 2 ? Number(i) : NaN))
    .filter((_i, idx) => idx > 2);

  return { target, exerciseHours };
};

interface weeklyResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calcRating = (avg: number, target: number): Rating => {
  switch (true) {
    case avg > target * 1.2:
      return 3;
    case avg < target * 0.8:
      return 1;
    default:
      return 2;
  }
};
const calcRatingDescr = (rating: Rating): string => {
  switch (rating) {
    case 1:
      return 'Terrible';
    case 2:
      return 'could do better';
    case 3:
      return 'nice';
  }
};

export const calcExerciseHours = (
  target: number,
  hours: number[]
): weeklyResult => {
  console.log(target);
  console.log(hours);
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;

  const trainingHours = hours.reduce((o, h) => o + h, 0);
  const average = trainingHours / periodLength;
  const rating = calcRating(average, target);
  const success = average >= target;
  const ratingDescription = calcRatingDescr(rating);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
if (require.main === module) {
  try {
    const { target, exerciseHours } = parseArgs(process.argv);
    console.log(calcExerciseHours(target, exerciseHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
