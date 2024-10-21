export const calculateBmi = (height: number, weight: number) => {
    
    const bmi = weight / ((height / 100) **2);

    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    }
    if (bmi <= 16.9 && bmi >= 16) {
        return 'Underweight (Moderate thinness)';
    }
    if (bmi <= 18.4 && bmi >= 17) {
        return 'Underweight (Mild thinness)';
    }
    if (bmi <= 24.9 && bmi >= 18.5) {
        return 'Normal range';
    }
    if (bmi <= 29.9 && bmi >= 25) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi <= 34.9 && bmi >= 30) {
        return 'Obese (Class I)';
    }
    if (bmi <= 39.9 && bmi >= 35) {
        return 'Obese (Class II)';
    }
    if (bmi >= 40) {
        return 'Obese (Class III)';
    }
    return 'Invalid BMI';
};

if (require.main === module) {
    const height: number = Number(process.argv[2]);
    const weight: number = Number(process.argv[3]);
  
    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
      console.log(calculateBmi(height, weight));
    } else {
      console.log('Please provide valid numbers for height and weight.');
    }
};