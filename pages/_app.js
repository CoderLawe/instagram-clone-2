import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ModalProvider } from '../atoms/context/modalContext';
function MyApp({ Component, pageProps:{session, ...pageProps} }) {

  return (
    
    <SessionProvider session={session}>
      <ModalProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ModalProvider>
    </SessionProvider>

  )

}

export default MyApp
