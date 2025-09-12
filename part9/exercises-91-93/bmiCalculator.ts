interface InputValues {
  h: number;
  w: number;
}

const parseArgs = (args: string[]): InputValues => {
  if (args.length !== 4)
    throw new Error('Requires exactly 2 args: height, weight');

  const h = Number(args[2]);
  const w = Number(args[3]);
  return {
    h,
    w,
  };
};

export const bmiCalc = (height: number, mass: number): string => {
  const height_m = height / 10;
  const bmi = mass / ((height_m * height_m) / 100);
  switch (true) {
    case bmi < 25:
      return 'Normal range';
    case bmi > 30:
      return 'Obese';
    default:
      return 'Overweight';
  }
};

try {
  const { h, w } = parseArgs(process.argv);
  console.log(bmiCalc(h, w));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
