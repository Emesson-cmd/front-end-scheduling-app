import { Suspense } from 'react';
import SignUpClient from './sign-up-client';

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpClient />
    </Suspense>
  );
}
