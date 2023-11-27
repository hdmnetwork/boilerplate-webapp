import { useReactiveVar } from '@apollo/client';
import { userConnected } from '../../../graphql';
import Page from '../../ui-kit/layout/Page.tsx';

const Dashboard = () => {
  const user = useReactiveVar(userConnected);

  return (
    <Page>
      <h1>
        Hello
        &nbsp;
        { user?.email }
      </h1>
    </Page>
  );
};

export default Dashboard;
