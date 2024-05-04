import type { Entry } from "@/types";
import { Box, Paper, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface entryProps {
  entry: Entry;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & { muiName: string; };
}

const Entry = ({ entry, icon: Icon }: entryProps) => {
  return (
    <Paper elevation={3} style={{ margin: '10px' }}>
      <Box p={2}>
        <p>{entry.date} <span>{entry.type}</span></p>
        <p>{entry.description}</p>
        <Icon data-testid={Icon.muiName} />
        <p>diagnose by {entry.specialist}</p>
      </Box>
    </Paper>
  );
};

export default Entry;