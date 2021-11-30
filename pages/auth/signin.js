import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";


// Running on the browser
function signin({ providers }) {
    return (
      <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">

          <img className="w-80" src="https://links.papareact.com/ocw" alt="insta logo"/>

          <p className="font-xs italic">
              This IS NOT the real Instagram. It is sipmly built for educational purposes
          </p>
        <div className="mt-40">
            {Object.values(providers).map((provider) => (
                    <div key={provider.name}>

                        <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id,{ callbackUrl:'/'})}>
                            Sign in with {provider.name}
                        </button>


                    </div>
                ))}
        </div>
      </div>
    
       
      </>
    )
}



// Server side render
export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props:{
            providers
        }
    }

}

export default signin
