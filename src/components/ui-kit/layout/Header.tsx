import { AppBar, Container } from '@mui/material';

const Header = () => (
  <AppBar position="static" color="inherit" sx={{ width: '100%', backgroundColor: '#1b202c' }}>
    <Container maxWidth="xl" />
  </AppBar>
);

export default Header;
