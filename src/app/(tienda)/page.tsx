import CardProductComponent from '../components/card-item/CardProduct';

export default function Home() {
  return (
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-[1200px] m-auto'>
        <CardProductComponent></CardProductComponent>
        <CardProductComponent></CardProductComponent>
        <CardProductComponent></CardProductComponent>
        <CardProductComponent></CardProductComponent>
        <CardProductComponent></CardProductComponent>
        <CardProductComponent></CardProductComponent>
      </div>
  );
}
