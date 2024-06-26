import { useReactiveVar } from '@apollo/client';
import {
  ReactNode, FC, useEffect, useState,
} from 'react';
import { loggedIn, userConnected } from '../../graphql/apollo/apollo';
import { useMeLazyQuery, User, useValidateTokenLazyQuery } from '../../graphql/generated';
import useLocalStorage from '../../hooks/useLocalStorage';

interface Props {
  children?: ReactNode | null,
  offlineComponent: ReactNode,
}

const AutoLoginProvider: FC<Props> = ({ children = null, offlineComponent }) => {
  const { get } = useLocalStorage();
  const isLoggedIn = useReactiveVar(loggedIn);
  const [ isAutoLogging, setAutoLogging ] = useState(get('bearer-token', null) !== null);
  const [ unauthorized, setUnauthorized ] = useState(false);
  const [ validateToken, { loading } ] = useValidateTokenLazyQuery();
  const [ getCurrentUser, { data: currentUser } ] = useMeLazyQuery();

  useEffect(() => {
    void (async () => {
      try {
        if (!get('bearer-token', null)) {
          setAutoLogging(false);

          return;
        }

        await validateToken({ variables: { token: get('bearer-token', '') } });
        const { data: user } = await getCurrentUser();

        if (!user) {
          setUnauthorized(true);
          setAutoLogging(false);
        }
      } catch (error) {
        setAutoLogging(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setAutoLogging(false);
      userConnected(currentUser.getLoggedUser as User);
      loggedIn(true);
    }
  }, [ currentUser ]);

  if (isAutoLogging || loading) {
    return <div>Loading</div>;
  }

  if (isLoggedIn && !unauthorized) {
    return <>{ children }</>;
  }

  return <>{ offlineComponent }</>;
};

export default AutoLoginProvider;
