import { ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode,
}

const Page = ({ children }: Props) => (
  <>
    <Header />
    { children }
  </>
);

export default Page;
