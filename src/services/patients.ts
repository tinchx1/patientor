import axios from "axios";
import { Diagnose, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const getOne = async (id: string | undefined) => {
  const res = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return res.data;

};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};
const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnose[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;

};
export default {
  getAll, create, getOne, getDiagnoses
};

