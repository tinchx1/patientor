import Entry from "./Entry";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BadgeIcon from '@mui/icons-material/Badge';
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <Entry entry={entry} icon={HealthAndSafetyIcon} />;
    case "Hospital":
      return <Entry entry={entry} icon={LocalHospitalIcon} />;
    case "OccupationalHealthcare":
      return <Entry entry={entry} icon={BadgeIcon} />;
    default:
      return null;
  }
};
export default EntryDetails;