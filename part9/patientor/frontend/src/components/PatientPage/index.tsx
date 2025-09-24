import patientService from '../../services/patients';
import entryService from '../../services/entries';
import diagnosesService from '../../services/diagnoses';

// import diagnosesService from '../../services/diagnoses';
import { Patient, Entry, EntryFormValues, Diagnosis } from '../../types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { green, yellow, red } from '@mui/material/colors';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { Stack, Box, Paper, Alert } from '@mui/material/';

import EntryForm from '../AddEntryModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'left',
}));

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>();
  const [alert, setAlert] = useState('');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  const id = useParams().id;

  useEffect(() => {
    diagnosesService.getAll().then((dias) => setDiagnoses(dias));
  }, []);

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((patient) => setPatient(patient));
    }
  }, [id]);
  if (!patient) {
    return <p>Did not find patient</p>;
  }
  // const DiagnosisCodes = (codes: string[] | undefined) => {
  //   if (!codes || codes.length < 1 || !diagnoses) {
  //     return;
  //   }

  //   return (
  //     <ul>
  //       {codes.map((c) => {
  //         const diagn = diagnoses.find((d) => d.code === c);
  //         if (!diagn) {
  //           return;
  //         }
  //         return (
  //           <li key={c}>
  //             {c} {diagn.name}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // };

  const healthRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon sx={{ color: green[600] }} />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[600] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: red[600] }} />;
      case 3:
        return <FavoriteIcon sx={{ color: red[600] }} />;
    }
  };

  const entry = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <>
            <span>
              {entry.date} <LocalHospitalIcon />
            </span>
            <p>{entry.description}</p>
            <p>Diagnose by {entry.specialist}</p>
            <span>
              Discharge:
              {entry.discharge.date}. Critera:
              {entry.discharge.criteria}
            </span>
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <span>
              {entry.date}
              <WorkIcon />
            </span>
            <p>{entry.description}</p>
            <p>Employer name: {entry.employerName}</p>
            <p>Diagnose by {entry.specialist}</p>
          </>
        );
      case 'HealthCheck':
        return (
          <>
            <span>
              {entry.date} <HealthAndSafetyIcon />
            </span>
            <p>{entry.description}</p>
            <p>{healthRatingIcon(entry.healthCheckRating)}</p>
            <p>Diagnose by {entry.specialist}</p>
          </>
        );
    }
  };

  const handleAddEntry = async (entryFormValues: EntryFormValues) => {
    if (!id) {
      throw new Error('No patient id');
    }
    try {
      const newEntry: Entry = await entryService.create(id, entryFormValues);
      setPatient({ ...patient, entries: [...patient.entries, newEntry] });
    } catch (error) {
      setAlert(String(error));
    }
  };

  const AlertBar = () => {
    if (!alert) {
      return null;
    }
    return <Alert severity="warning">{alert}</Alert>;
  };

  return (
    <div>
      <AlertBar />
      <h2>{patient.name}</h2>
      <p>Sex: {patient.gender} </p>
      <p>ssn: {patient.ssn} </p>
      <p>Occupation: {patient.occupation} </p>
      <h2>entries</h2>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {patient.entries.map((e) => {
            return <Item key={e.id}>{entry(e)}</Item>;
          })}
        </Stack>
      </Box>

      <EntryForm
        handleAddEntry={handleAddEntry}
        setAlert={setAlert}
        diagnoses={diagnoses}
      />
    </div>
  );
};

export default PatientPage;
