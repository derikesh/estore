export default function ClinetLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
            header
            {children}
        </body>
      </html>
    );
  }