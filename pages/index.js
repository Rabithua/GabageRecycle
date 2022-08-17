import Head from 'next/head'
import Header from '../compoents/header'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>garbage be like</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='./style.css' />
      </Head>
      <Header></Header>
      <main>
        <div className='line'></div>
        <div className='content'>
          <div className='left'>
            <h1 className="title">
              GARBAGE BE LIKE... <br></br> JUST LIKE...
            </h1>
            <h3 className='dsc'>请不要为难我，我只是一个小猫咪！</h3>
            <div className='buttons'>
              <div className='button'>Button</div>
              <div className='cancel'>Cancel</div>
            </div>
          </div>
          <div className='right'>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
