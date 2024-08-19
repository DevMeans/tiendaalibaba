import NavbarComponent from "../components/navbar/Navbar";
import SidebarComponent from '../components/sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <>
      <NavbarComponent></NavbarComponent>
      <SidebarComponent></SidebarComponent>
      <main>
        {children}
      </main>
      

    </>
  );
}
