// RTFM: The app directory MUST include a root layout and it CANNOT be a client component
// The _app.tsx and _document.tsx from /pages
// styles in app/layout will no apply to pages/* so you should still keep the _app and _documents to prevent the old routes from breaking.
// Once the migration is completed, then you can delete those 2 files

// RTFM: Inside the root layout (app/layout.tsx), import the globals.css stylesheet to apply the styles to every route in your application.

import { StyledComponentsRegistry } from 'utils/StyledComponentsRegistry';
import '../styles/globals.css';

import { open_sans, arvo, josefinSlab, gluten } from './fonts';

import StateManagementProviders from 'utils/StateManagementProviders';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The root layout must define <html>, and <body> tags since Next.js does not automatically create them
    <html
      lang="en"
      className={`${open_sans.variable} ${arvo.variable} ${josefinSlab.variable} ${gluten.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <h1 className={'font-bold'}>Welcome to PALO IT!</h1>
          <StateManagementProviders>{children}</StateManagementProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};
