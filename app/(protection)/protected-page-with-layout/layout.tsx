import { ReactNode } from 'react';

export default function ProtectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  // get token from store
  // async validate token with backend
  // if not valid then
  // else render children
}
