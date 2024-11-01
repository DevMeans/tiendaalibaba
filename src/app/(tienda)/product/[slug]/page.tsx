
import 'swiper/css';
import AddCartPage from './AddCart';
import { getProductSlug } from '@/actions/product/get-product-slug';
import Head from 'next/head';
import { Metadata } from 'next';
interface Props {
  params: {
    slug: string
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductSlug(slug);

  return {
    title: product ? product.name : 'Producto no encontrado',
    description: product ? product.description : 'No hay descripción disponible',
    openGraph: {
      title: product ? product.name : 'Producto no encontrado',
      description: product ? product.description : 'No hay descripción disponible',
    },
  };
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