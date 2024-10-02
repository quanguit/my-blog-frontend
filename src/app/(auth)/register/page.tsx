import { Metadata } from 'next';

import { Register } from './ui/register';

export const metadata: Metadata = {
  title: 'Register',
  description: 'This is Register Page',
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
