import Header from "@/src/components/layout/Header/Header";
import Footer from "@/src/components/layout/Footer/Footer";

import { BooksProvider } from "@/src/context/BooksContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <BooksProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BooksProvider>
      </body>
    </html>
  );
}