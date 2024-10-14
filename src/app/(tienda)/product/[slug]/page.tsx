
import 'swiper/css';
import AddCartPage from './AddCart';
import { getProductSlug } from '@/actions/product/get-product-slug';
interface Props {
  params: {
    slug: string
  }
}
export default async function ProductSlug({ params }: Props) {
  const { slug } = params
  console.log(slug)
  const product = await getProductSlug(slug)
  return (
    <>
      <main className="max-w-[1200px] p-5 m-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-10 ">
        {
          (product == null) ? 'No hay producto' : <AddCartPage product={product}></AddCartPage>
        }

      </main>
    </>
  );
}