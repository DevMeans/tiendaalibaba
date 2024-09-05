import { auth } from "@/auth.config";
import AdressFormComponent from "./FormAddress";

export default async function AddressPage() {

  return (
    <div className="m-auto max-w-[1200px] p-10">
      <AdressFormComponent ></AdressFormComponent>
    </div>
  );
}