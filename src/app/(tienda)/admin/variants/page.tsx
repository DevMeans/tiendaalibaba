import { ColorComponent } from './color/Color';
import { TallaComponent } from './talla/Talla';

export default function VariantsPage() {
    return (
        <div className="max-w-[1200px] m-auto px-5">
            <span className="">Variantes de productos</span>
            <div className='h-5'>

            </div>
            <ColorComponent></ColorComponent>
            <div className='w-full border border-black mt-5 mb-5'>
            </div>
            <TallaComponent></TallaComponent>
        </div>
    );
}