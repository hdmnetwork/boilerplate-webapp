import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import {
  loggedIn, useLoginLazyQuery, useMeLazyQuery, User, userConnected,
} from '../../../graphql';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';
import HStack from '../../ui-kit/layout/HStack.tsx';
import VStack from '../../ui-kit/layout/VStack.tsx';

const Homepage = () => {
  const [ dto, setDto ] = useState({ email: '', password: '' });
  const [ login, { loading: isLogging } ] = useLoginLazyQuery();
  const [ fetchCurrentUser ] = useMeLazyQuery();
  const { set } = useLocalStorage();

  const handleOnConnect = async () => {
    const { data } = await login({ variables: dto });

    if (!data) {
      throw new Error('Error while logging');
    }

    set('bearer-token', data.login);

    const { data: fetchedCurrentUser } = await fetchCurrentUser();

    if (fetchedCurrentUser) {
      loggedIn(true);
      userConnected(fetchedCurrentUser.getLoggedUser as User);
    }
  };

  return (
    <HStack justifyContent="center">
      <VStack maxWidth={450}>
        <Typography variant="h3" component="h2" sx={{ mb: 2, mt: 2 }}>Your Project Name</Typography>
        <TextField
          label="E-mail"
          variant="outlined"
          sx={{ mb: 2, width: '100%', maxWidth: 400 }}
          onChange={({ target: { value: email } }) => setDto({ ...dto, email })}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          sx={{ mb: 2, width: '100%', maxWidth: 400 }}
          onChange={({ target: { value: password } }) => setDto({ ...dto, password })}
        />
        <Button variant="contained" disabled={isLogging} onClick={handleOnConnect}>Se connecter</Button>
      </VStack>
    </HStack>
  );
};

export default Homepage;
