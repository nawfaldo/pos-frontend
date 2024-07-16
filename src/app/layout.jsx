import { ApolloWrapper } from "@/utils/apollo";

import "./globals.css";

export const metadata = {
  title: "sistem",
  description: "Still in development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
