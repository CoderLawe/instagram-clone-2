import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"
import { useSession } from "next-auth/react";

function Feed() {

    const {data: session} = useSession();
    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${ !session && "!grid-cols-1 !max-w-3xl" }`}>
            
            {/* The feed takes up 2 grid columns and the mini profile takes one */}
            {/* Section on the left  */}
            {/* Stories */}
            {/* Posts */}
            <section className="col-span-2">
                <Stories />
                <Posts />
            </section>


            {/* Right side  with Mini profile and suggestions */}
            {
                    session &&
            <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed top-20">

            
                    
                        <MiniProfile />

             
                    <Suggestions />
                </div>
           
            </section>
               }
        </main>
    )
}

export default Feed
