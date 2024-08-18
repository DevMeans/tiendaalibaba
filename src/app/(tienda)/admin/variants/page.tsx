
import { ListColor } from '@/actions/color';
import { ColorComponent } from './color/Color';
import { TallaComponent } from './talla/Talla';

export default async function VariantsPage() {
    const listColor = await ListColor()
    return (
        <div className="max-w-[1200px] m-auto px-5">
            <span className="">Variantes de productos</span>
            <div className='h-5'>

            </div>
            <ColorComponent colors={listColor}></ColorComponent>
            <div className='w-full border border-black mt-5 mb-5'>
            </div>
            <TallaComponent></TallaComponent>
        </div>
    );
}