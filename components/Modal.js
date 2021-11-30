import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";
import { Fragment } from "react";
function Modal() {
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <Transition.apply.ROOT show={open} as ={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo = "opacity-100"
                        leaveFrom="opacity-100"
                        leaveTo = "opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opaity-75 transition-opacity"/>
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>


                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 am:translate-y-0 sm:Scale-95"
                        enterTo = "opacity-200 translate-y-0 sm:scale-100 opacity-100"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo = "opacity-0 tramslate-y-4 sm:transltae-y-0 sm:scale-95"
                        >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overlow-hidden shadow-xl transform transition-all sm:my-0 sm:align-moddle sm:max-w-sm sm:w-full sm:p-6">
                            <h1>Hello</h1>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.apply.ROOT>
    )
}

export default Modal
