import Image from "next/image";
import { HeartIcon, HomeIcon, MenuIcon, PlusCircleIcon, SearchIcon, UserGroupIcon } from "@heroicons/react/solid"
import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useContext } from "react";
import { ModalContext } from "../atoms/context/modalContext";

function Header() {

    const { data: session } = useSession();
    console.log(session)
    const [open, setOpen] = useContext(ModalContext)
    const router = useRouter();
    return (
        <div className="shadow-sm sticky top-0  bg-white z-50">
            {/* Left */}
            <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto items-center">
                <div className="relative hidden lg:inline-grid  w-24 cursor-pointer">
                    <Image 
                    src="https://links.papareact.com/ocw" 
                    layout="fill"
                    objectFit = "contain"
                    />
                </div>


                <div className="relative w-10  flex-shrink-0   lg:hidden cursor-pointer">
                {/* Flex shrink prevents the logo from becoming smaller as the screen shrinks */}
                    <Image  
                    onClick={signOut}
                    src="https://links.papareact.com/jjm"
                    layout="fill"
                    objectFit="contain"
                    />
                </div>

                {/* onClick={router.push('/')}  */}
                {/* Middle Search component*/}
                <div className="max-w-xs">
                    <div className="rounded-md items-center relative mt-1 flex p-3 ">
                        <div className="flex absolute inset-y-0 items-center ml-2">
                            <SearchIcon className="h-5 w-5 text-gray-500"/>
                        </div>
                        
                        <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300  focus:ring-black focus:border-black rounded-md" type="text" placeholder="search"/>
                    </div>
                </div>
                
                {/* Right */}

                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon className="icons" />
                    <MenuIcon className="h-6 md:hidden cursor-pointer" />

                    { session ? 
                    
                    <>
 <div className="relative icons">
                        <PaperAirplaneIcon className="icons  rotate-45" />
                        <span className="bg-red-500 text-gray-200 absolute -right-2 text-xs -top-1 flex items-center justify-center animate-pulse rounded-full p-1  w-5 h-5 animate:pulse  bg-opacity-90 z-52"> 9</span>
                    </div>
                    <PlusCircleIcon onClick={() => setOpen(true)} className="icons"/>
                    <UserGroupIcon className="icons" />
                    <HeartIcon className="icons"/>

                    <img onClick = {signOut} className="h-10 w-10 rounded-full cursor-pointer" src={session.user.image} alt="Image of user"/>
                    </>
                    
                    : (
                        <button onClick={signIn} >Sign In</button>
                    )}
                   

                </div>
            </div>
        </div>
    )
}

export default Header
