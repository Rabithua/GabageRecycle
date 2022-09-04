import Header from '../compoents/header.jsx'
import Tips from '../compoents/tips.jsx'
import Timer from '../compoents/timer.jsx'

export const globalState = {
    tips: [],
    cleartips_timer: null
}

export const globalComponent = {
    Header: Header,
    Tips: Tips,
    Timer: Timer
}

export const globalMethed = {

    addTips(tip) {
        console.log(tip)
        var tips = globalState.tips
        var newtips = [...tips]
        newtips.push(tip)
        globalState.tips = newtips
    },

}

function MyApp({ Component, pageProps }) {

    return (
        <Component {...pageProps} />
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp