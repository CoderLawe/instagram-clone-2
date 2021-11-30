function Story({ img, username}) {
    return (
        <div>
            <img className="h-14 w-14 rounded-full p-[1.5px]  border-red-500 border-2 object-contain hover:scale-110 transform transition-al duration-300 ease-out cursor-pointer"src="https://avatars.githubusercontent.com/u/52962217?v=4" alt=""/>
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}

export default Story
