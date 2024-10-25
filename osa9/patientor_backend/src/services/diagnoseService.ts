import diagnosesData from '../data/diagnoses';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;


const getEntries = (): DiagnosesEntry[] => {  
    return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};