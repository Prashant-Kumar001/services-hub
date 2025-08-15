import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <aside>
          <h1>Admin</h1>
        </aside>
        {children}
      </body>
    </html>
  );
}

