
'use client'
import './modal.css'
import { useUIStore } from '../../../store/ui/ui-store';
export default function ModalComponent() {
    const iSsideModalOpen = useUIStore(state => state.isOpenModalColor)
    const closemodal = useUIStore(state => state.closeModal)
    return (
        <div>
            {iSsideModalOpen && (
                <div
                    className="main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
                    style={{ background: 'rgba(0,0,0,.7)' }}
                >
                    <div className="border border-black ¿ modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            {/* Title */}
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Header</p>
                                <div className="modal-close cursor-pointer z-50" onClick={() => closemodal('color')}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Body */}
                            <div className="my-5">
                                <p>Inliberali Persius Multi iustitia pronuntiaret expeteretur sanos didicisset laus angusti ferrentur arbitrium arbitramur huic desiderent.?</p>
                            </div>
                            {/* Footer */}
                            <div className="flex justify-end pt-2">
                                <button
                                    className="focus:outline-none modal-close px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
                                    onClick={() => closemodal('color')}
                                >
                                    Cancel
                                </button>
                                <button className="focus:outline-none px-4 bg-black p-3 ml-3 rounded-lg text-white">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
