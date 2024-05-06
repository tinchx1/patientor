import { Diagnose, Entry, NewEntry, Patient } from "@/types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import patientService from "@/services/patients";
import EntryDetails from "./EntryDetails";
import { Button } from "@mui/material";
import FormEntry from "./FormEntry";

export const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [show, setShow] = useState(false);

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
  const handleShow = () => {
    setShow(!show);
  };
  const toNewEntry = async (values: NewEntry) => {
    const id = patient?.id;
    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({ ...patient, entries: [...patient.entries, newEntry] });
    } catch (e) {
      console.error(e.response.data);
    }
  };
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
      <Button variant="contained" onClick={handleShow}>ADD NEW ENTRY</Button>
      {show && <FormEntry toNewEntry={toNewEntry} setShow={setShow} diagnoses={diagnoses} />}
    </div >
  );
}; 