import { Diagnose, Entry, NewEntry } from "@/types";
import { Button, FormControl, Input, InputLabel, NativeSelect, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
interface FormEntryStates {
  entry: NewEntry,
}
interface PropsFormEntry {
  setShow: (value: boolean) => void
  diagnoses: Diagnose[],
  toNewEntry: (values: Entry) => Promise<void>
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, diagnosisCodes: string[], theme: Theme) {
  return {
    fontWeight:
      diagnosisCodes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const FormEntry = ({ setShow, diagnoses, toNewEntry }: PropsFormEntry) => {
  const theme = useTheme();
  const baseState: NewEntry = {
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: 0,
  };
  const [formValues, setFormValues] = useState<FormEntryStates["entry"]>(baseState);
  console.log(formValues);
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value
    });
  };
  const handleChangeType = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormValues({
      ...baseState,
      [name as string]: value
    });
  };
  const handleChangeCodes = (event: SelectChangeEvent<typeof formValues.diagnosisCodes>) => {
    const selectedCode = [event.target.value as string];
    setFormValues({
      ...formValues,
      diagnosisCodes: [...(formValues.diagnosisCodes ?? []), ...selectedCode],
    });
  };
  const addEntry = () => {
    setShow(false);
    toNewEntry(formValues);
  };
  return (
    <FormControl>
      <FormControl fullWidth variant="standard">
        <InputLabel variant="standard" htmlFor="type">
          Type
        </InputLabel>
        <NativeSelect
          defaultValue={formValues.type}
          inputProps={{
            name: 'type',
            id: 'type',
          }}
          onChange={handleChangeType}
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="OccupationalHealthcare">OccupationalHealthcare</option>
          <option value="Hospital">Hospital</option>
        </NativeSelect>
      </FormControl>
      {formValues.type === "HealthCheck" && (
        <>
          <FormControl>
            <InputLabel htmlFor="description">description</InputLabel>
            <Input onChange={handleChange} name="description" value={formValues.description}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="date">date</InputLabel>
            <Input onChange={handleChange} type="date" name="date" value={formValues.date}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="specialist">specialist</InputLabel>
            <Input onChange={handleChange} name="specialist" value={formValues.specialist}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="healthCheckRating">healthCheckRating</InputLabel>
            <Input onChange={handleChange} type="number" name="healthCheckRating" value={formValues.healthCheckRating}></Input>
          </FormControl>
          <FormControl>
            <InputLabel id="multiple-name-label" htmlFor="diagnosisCodes">diagnosisCodes</InputLabel>
            <Select
              labelId="multiple-name-label"
              multiple
              native
              value={formValues.diagnosisCodes ?? []}
              onChange={handleChangeCodes}
              MenuProps={MenuProps}
              input={<OutlinedInput id="select-multiple-chip" label="diagnosisCodes" />}
              inputProps={{
                name: 'diagnosisCodes',
                id: 'diagnosisCodes',
              }}>
              {diagnoses.map((diagnose) => (
                <option
                  key={diagnose.code}
                  value={diagnose.code}
                  style={getStyles(diagnose.code, formValues.diagnosisCodes ?? [], theme)}
                >
                  {diagnose.code}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {formValues.type === "OccupationalHealthcare" && (
        <>
          <FormControl>
            <InputLabel htmlFor="description">description</InputLabel>
            <Input onChange={handleChange} name="description" value={formValues.description}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="date">date</InputLabel>
            <Input onChange={handleChange} type="date" name="date" value={formValues.date}></Input>
          </FormControl>
          {formValues.type === "OccupationalHealthcare" && (
            <FormControl>
              <InputLabel htmlFor="employerName">Employer Name</InputLabel>
              <Input onChange={handleChange} name="employerName" value={formValues.employerName}></Input>
            </FormControl>
          )}
          <FormControl>
            <InputLabel htmlFor="specialist">specialist</InputLabel>
            <Input onChange={handleChange} name="specialist" value={formValues.specialist}></Input>
          </FormControl>
          <FormControl>
            <InputLabel id="multiple-name-label" htmlFor="diagnosisCodes">diagnosisCodes</InputLabel>
            <Select
              labelId="multiple-name-label"
              multiple
              native
              value={formValues.diagnosisCodes ?? []}
              onChange={handleChangeCodes}
              MenuProps={MenuProps}
              input={<OutlinedInput id="select-multiple-chip" label="diagnosisCodes" />}
              inputProps={{
                name: 'diagnosisCodes',
                id: 'diagnosisCodes',
              }}>
              {diagnoses.map((diagnose) => (
                <option
                  key={diagnose.code}
                  value={diagnose.code}
                  style={getStyles(diagnose.code, formValues.diagnosisCodes ?? [], theme)}
                >
                  {diagnose.code}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {formValues.type === "Hospital" && (
        <>
          <FormControl>
            <InputLabel htmlFor="description">description</InputLabel>
            <Input onChange={handleChange} name="description" value={formValues.description}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="date">date</InputLabel>
            <Input onChange={handleChange} type="date" name="date" value={formValues.date}></Input>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="specialist">specialist</InputLabel>
            <Input onChange={handleChange} name="specialist" value={formValues.specialist}></Input>
          </FormControl>
          <FormControl>
            <InputLabel id="multiple-name-label" htmlFor="diagnosisCodes">diagnosisCodes</InputLabel>
            <Select
              labelId="multiple-name-label"
              multiple
              native
              value={formValues.diagnosisCodes ?? []}
              onChange={handleChangeCodes}
              MenuProps={MenuProps}
              input={<OutlinedInput id="select-multiple-chip" label="diagnosisCodes" />}
              inputProps={{
                name: 'diagnosisCodes',
                id: 'diagnosisCodes',
              }}>
              {diagnoses.map((diagnose) => (
                <option
                  key={diagnose.code}
                  value={diagnose.code}
                  style={getStyles(diagnose.code, formValues.diagnosisCodes ?? [], theme)}
                >
                  {diagnose.code}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="discharge">discharge</InputLabel>
            <InputLabel htmlFor="date">date</InputLabel>
            <Input onChange={handleChange} type="date" name="date" value={formValues.discharge?.date}></Input>
          </FormControl>
        </>
      )}
      <Button variant="contained" onClick={addEntry}>ADD</Button>
      <Button variant="contained" onClick={() => setShow(false)}>Cancel</Button>
    </FormControl>);
};

export default FormEntry;