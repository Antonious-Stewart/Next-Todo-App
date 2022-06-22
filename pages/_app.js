import MetaTag from '../layout/MetaTag'
import Navigation from '../layout/Navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MetaTag description="A simple app to create and manage todos" title="Next Todo"/> 
      <Navigation />
      <Component {...pageProps} />
    </>

  )
}

export default MyApp
