import { Metadata } from 'next';

import { Login } from './ui/login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is Login Page',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
