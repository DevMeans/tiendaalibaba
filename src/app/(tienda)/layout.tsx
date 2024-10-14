import NavbarComponent from "../components/navbar/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <>
      <NavbarComponent></NavbarComponent>
      <main>
        {children}
      </main>
      

    </>
  );
}
