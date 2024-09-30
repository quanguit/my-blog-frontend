import { Metadata } from 'next';

import { Contact } from './ui/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'This is Contact Page',
};

export default function ContactPage() {
  return <Contact />;
}
