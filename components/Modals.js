import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { modalState } from "../atoms/modalAtom";
import { Fragment } from "react";

function Modals() {
    const [open, setOpen] = useRecoilState(modalState)
    return (
        <div>
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overlow-hidden shadow-xl transform transition-all sm:my-0 
                        sm:align-moddle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title 
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Upload a Photo
                                        </Dialog.Title>

                                        <div>
                                            <input 
                                            // ref={filePickerRef}
                                             type="file hidden" 
                                            //  onChange={addImageToPost}
                                             />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-5 sm:mt-6">
                                    <button 
                                        type="button"
                                        // disabled={!selectedFile}
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 
                                        text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 fpcus:ring-red-500 
                                        sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                                    >
                                        Upload Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.apply.ROOT>
        </div>
    )
}

export default Modals
