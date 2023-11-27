import { BoxProps } from '@mui/material/Box/Box';
import { Box } from '@mui/material';

const HStack = ({ ...props }: BoxProps) => (
  <Box { ...props } sx={{ ...props.sx, display: 'flex' }}>{ props.children }</Box>
);

export default HStack;
