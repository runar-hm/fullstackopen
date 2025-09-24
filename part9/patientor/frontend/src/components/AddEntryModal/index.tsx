import { EntryFormValues, Diagnosis } from '../../types';
import EntryForm from './AddEntryForm';
interface Props {
  handleAddEntry: (payload: EntryFormValues) => void;
  setAlert: (msg: string) => void;
  diagnoses: Diagnosis[];
}
const AddEntryModal = ({ handleAddEntry, setAlert, diagnoses }: Props) => {
  return (
    <EntryForm
      onSubmit={handleAddEntry}
      setAlert={setAlert}
      diagnoses={diagnoses}
    />
  );
};

export default AddEntryModal;
