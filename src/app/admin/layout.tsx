import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <aside>
        <h1>Admin</h1>
      </aside>
      {children}
    </main>
  );
}
