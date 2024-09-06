import { auth } from "@/auth.config";
import AdressFormComponent from "./FormAddress";
import { Toaster, toast } from 'sonner'
import Link from "next/link";
export default async function AddressPage() {
  const session = await auth()
  console.log(session)
  if (!session?.user) {
    return (

      <div className="max-w-[1200px] m-auto">
        <h3 className='text-5xl mb-6'>500 -no hay sesion de usuario </h3>
        <Link href={`/auth/login`} className="bg-black text-white p-2">Login</Link>
      </div>

    )
  }
  return (
    <div className="m-auto max-w-[1200px] p-10">
      <Toaster richColors position="top-right" />
      <AdressFormComponent ></AdressFormComponent>
    </div>
  );
}