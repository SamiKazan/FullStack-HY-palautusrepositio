import patientData from '../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: PatientEntry[] = patientData.map(patient => ({
  ...patient,
  gender: patient.gender,
  entries: patient.entries
}));
 
const getEntries = (): PatientEntry[] => {  
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {  
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): PatientEntry | undefined => {  
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry: PatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};