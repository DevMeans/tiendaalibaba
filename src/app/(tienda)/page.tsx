import { getPublicProduct } from '@/actions/product/get-product';
import CardProductComponent from '../components/card-item/CardProduct';

export default async function Home() {
  const products = await getPublicProduct()
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-[1200px] m-auto'>
      {
        products.map((item) => (
          <CardProductComponent key={item.id} product={item}></CardProductComponent>
        ))
      }
    </div>
  );
}
