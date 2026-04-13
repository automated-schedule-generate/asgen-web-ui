// src/app/layout.tsx básico para teste
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        {children} {/* Aqui deve aparecer o conteúdo do page.tsx da home */}
      </body>
    </html>
  );
}
