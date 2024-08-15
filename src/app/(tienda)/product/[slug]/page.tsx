'use client'
import SwiperProductComponent from '@/app/components/swiper/Swiper';
import { useUIStore } from '@/store';
import Image from 'next/image';

import 'swiper/css';

export default function ProductsLUG() {
  const openSideMenu = useUIStore(state => state.openSideMenu)
  return (
    <main className="max-w-[1200px] p-5 m-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-10 ">
      <div className="">
        <div className='font-semibold'>
          Camiseta de poliéster 100%, camiseta Polo de Golf
        </div>
        <SwiperProductComponent></SwiperProductComponent>
      </div>
      <div className='p-5  divide-y rounded-md'>
        <div>
          <span className='font-semibold text-xl'>
            Precio : S/20
          </span>
        </div>
        <div>
          <div className='flex justify-between mt-4 mb-2'>
            <span> variaciones: 17 colores ,8 Tallas</span>
            <span>Seleccionar ahora</span>
          </div>
          <div className='flex flex-col gap-3 mt-4'>
            <span>1. Color (17) : 1</span>
            <div className='flex flex-wrap'>
              <Image onClick={() => openSideMenu()} className='border-[2px] border-[black] cursor-pointer' alt='' src={`https://sc04.alicdn.com/kf/H31d890cdd45742e3b2ceedc812818fffY.jpg`} width={60} height={60}></Image>
              <Image onClick={() => openSideMenu()} alt='' src={`https://sc04.alicdn.com/kf/He93a62c89ff04d9fbb92e5a4566cadb5t.jpg`} width={60} height={60}></Image>
              <Image onClick={() => openSideMenu()} alt='' src={`https://sc04.alicdn.com/kf/He2a94562fee649d0bd96e22651f15adeD.jpg`} width={60} height={60}></Image>
              <Image onClick={() => openSideMenu()} alt='' src={`https://sc04.alicdn.com/kf/H2e551f1add6741faa884399ebbffebd9y.jpg`} width={60} height={60}></Image>
              <Image onClick={() => openSideMenu()} alt='' src={`https://sc04.alicdn.com/kf/H09cb7d812e944107802f388bf1486d44H.jpg`} width={60} height={60}></Image>
              <Image onClick={() => openSideMenu()} alt='' src={`https://sc04.alicdn.com/kf/Hc8dba2f7397b4a3f9426bdbc7e6a6218Y.jpg`} width={60} height={60}></Image>
            </div>
            <div className='flex flex-col gap-3'>
              <span>2.Talla (8) </span>
              <div className='flex gap-3'>
                <div className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                  <span className='p-3'>S</span>
                </div>
                <div className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                  <span className='p-3'>M</span>
                </div>
                <div className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                  <span className='p-3'>L</span>
                </div>
                <div className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                  <span className='p-3'>XL</span>
                </div>
                <div className=' bg-slate-300 rounded cursor-pointer' onClick={() => openSideMenu()}>
                  <span className='p-3'>XXL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-2 pt-4'>
          <p className='font-semibold'>Descripcion</p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis blanditiis ad natus eligendi perspiciatis porro autem dicta ipsam! Ut expedita perferendis, eius nisi esse fugit consequuntur aspernatur dolorem voluptate nihil.
        </div>
        <div className='mt-2 pt-4'>
          <div>
            Envío
            Mar + entrega en EE. UU. (económico) Cambiar
            Total del envío: $18.86 por 2 piezas
            Entrega estimada oct.15
          </div>
          <button className='p-2 bg-black text-white mt-5'>Iniciar Pedido</button>
        </div>
      </div>
    </main>
  );
}