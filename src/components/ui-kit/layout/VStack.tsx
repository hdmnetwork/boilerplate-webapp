import { BoxProps } from '@mui/material/Box/Box';
import { Box } from '@mui/material';

const VStack = ({ children, ...props }: BoxProps) => (
  <Box { ...props } sx={{ ...props.sx, display: 'flex', flexDirection: 'column' }}>{ children }</Box>
);

export default VStack;
