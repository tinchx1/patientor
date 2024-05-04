import { Diagnose, Patient } from "@/types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import patientService from "@/services/patients";
import EntryDetails from "./EntryDetails";

export const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchedDiagnoses = await patientService.getDiagnoses();
      setDiagnoses(fetchedDiagnoses);
      console.log(fetchedDiagnoses);
    };
    const fetchPatient = async () => {
      const fetchedPatient = await patientService.getOne(id);
      setPatient(fetchedPatient);
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id]);
  if (!patient) {
    return <div>Loading...</div>;
  }
  const entryDiagnoses = patient.entries.map(entry => {
    return entry.diagnosisCodes?.map(code => {
      return diagnoses.find(diagnose => diagnose.code === code);
    });
  });
  return (
    <div>
      <h1>{patient.name} <span>{patient.gender}</span></h1>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map(entry => {
        return (
          <EntryDetails key={entry.id} entry={entry} />
        );
      })}
    </div >
  );
}; 