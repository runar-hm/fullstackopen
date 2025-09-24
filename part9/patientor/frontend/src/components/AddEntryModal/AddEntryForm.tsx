import { useState } from 'react';
import {
  FormControl,
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material/';

import {
  EntryType,
  HealthCheckRating,
  EntryFormValues,
  Discharge,
  SickLeave,
  Diagnosis,
} from '../../types';

interface Props {
  onSubmit: (payload: EntryFormValues) => void;
  setAlert: (msg: string) => void;
  diagnoses: Diagnosis[];
}

const SpecialEntries = ({
  type,
  discharge,
  setDischarge,
  healthCheckRating,
  setHealthCheckRating,
  employerName,
  setemployerName,
  sickLeave,
  setSickLeave,
}: {
  type: EntryType | string;
  discharge: Discharge;
  setDischarge: (d: Discharge) => void;
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (h: HealthCheckRating) => void;
  employerName: string;
  setemployerName: (s: string) => void;
  sickLeave: SickLeave;
  setSickLeave: (s: SickLeave) => void;
}) => {
  switch (type) {
    case EntryType.Hospital:
      return (
        <>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="dischargeDate"
            type="date"
            value={discharge.date}
            onChange={({ target }) =>
              setDischarge({ ...discharge, date: target.value })
            }
          />
          <TextField
            label="dischargeCriteria"
            value={discharge.criteria}
            onChange={({ target }) =>
              setDischarge({ ...discharge, criteria: target.value })
            }
          />
        </>
      );
    case EntryType.HealthCheck:
      return (
        <TextField
          label="Healtcheck rating"
          value={healthCheckRating}
          onChange={({ target }) =>
            setHealthCheckRating(Number(target.value) as HealthCheckRating)
          }
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <TextField
            label="Employee Name"
            value={employerName}
            onChange={({ target }) => setemployerName(target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Sickleave Start"
            type="date"
            value={sickLeave.startDate}
            onChange={({ target }) =>
              setSickLeave({ ...sickLeave, startDate: target.value })
            }
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Sickleave end"
            type="date"
            value={sickLeave.endDate}
            onChange={({ target }) =>
              setSickLeave({ ...sickLeave, endDate: target.value })
            }
          />
        </>
      );
    default:
      return null;
  }
};

const EntryForm = ({ onSubmit, setAlert, diagnoses }: Props) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setdescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [discharge, setDischarge] = useState<Discharge>({
    date: '',
    criteria: '',
  });

  const [employerName, setemployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  });

  const [expanded, setExpanded] = useState<boolean>(false);

  const allDiagnosisCodes = diagnoses.map((d) => d.code);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // basic runtime validation: ensure `type` is one of the allowed literals
    if (!['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(type)) {
      setAlert('Invalid type');
      return;
    }

    // build the discriminated payload explicitly so TS knows the exact literal `type`
    let payload: EntryFormValues;
    switch (type) {
      case 'HealthCheck':
        payload = {
          type: 'HealthCheck',
          date,
          description,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        };
        break;
      case 'OccupationalHealthcare':
        payload = {
          type: 'OccupationalHealthcare',
          date,
          description,
          specialist,
          diagnosisCodes,
          sickLeave,
          employerName,
        };
        break;
      case 'Hospital':
        payload = {
          type: 'Hospital',
          date,
          description,
          specialist,
          diagnosisCodes,
          discharge,
        };
        break;
      default:
        // should never happen due to the check above
        throw new Error('No type match');
    }

    onSubmit(payload);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (!value) {
      throw new Error('missing value');
    }
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  if (!expanded) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => setExpanded(!expanded)}
      >
        Add new entry
      </Button>
    );
  }

  return (
    <Box>
      <h2>New entry</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <RadioGroup
            sx={{ mb: 2 }}
            row
            value={type}
            onChange={({ target }) => setType(target.value)}
          >
            {Object.keys(EntryType).map((type, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  label={type}
                  control={<Radio />}
                  value={type}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <Stack spacing={2} direction="column">
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="description"
            value={description}
            onChange={({ target }) => setdescription(target.value)}
          />

          <TextField
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          ></TextField>

          {allDiagnosisCodes ? (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Diagnosis Codes
              </InputLabel>
              <Select
                multiple
                value={diagnosisCodes}
                onChange={handleDiagnosisCodesChange}
                input={<OutlinedInput label="Diagnosis Codes" />}
              >
                {allDiagnosisCodes.map((diagnose, idx) => (
                  <MenuItem key={idx} value={diagnose}>
                    {diagnose}
                  </MenuItem>
                ))}
                {/* {diagnoses.map((diagnose) => (
                  <MenuItem key={diagnose.code} value={diagnose.code}>
                    {diagnose.code}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          ) : null}

          <SpecialEntries
            type={type}
            discharge={discharge}
            setDischarge={setDischarge}
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
            employerName={employerName}
            setemployerName={setemployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        </Stack>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => setExpanded(!expanded)}
      >
        Cancel entry
      </Button>
    </Box>
  );
};

export default EntryForm;
