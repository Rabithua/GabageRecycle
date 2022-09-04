import Head from 'next/head'
import React from 'react'
import Header from '../compoents/header.jsx'
import { globalComponent, globalMethed, globalState } from './_app.js'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tips: [],
      cleartips_timer: null
    }
  }

  componentDidMount(e) {
    // console.log(globalComponent)
  }

  buttonClick(tip) {
    if (this.state.cleartips_timer) {
      clearTimeout(this.state.cleartips_timer)
    }

    var tips = this.state.tips
    var newtips = [...tips]
    newtips.push(tip)

    var cleartips_timer = setTimeout(() => {
      this.setState({
        tips: []
      })
    }, 2000)

    this.setState({
      tips: newtips,
      cleartips_timer: cleartips_timer
    })
  }

  render() {
    return (
      <div className="container" >
        <Head>
          <title>废物回收</title>
          <link rel="icon" href="/cat.ico" />
          <link rel='stylesheet' href='./style.css' />
        </Head>
        <Header login={() => this.buttonClick({
          content: '💡现在你可以假装已经登陆了！',
          type: 'primary'
        })}></Header>
        <main>
          <div className='line'></div>
          <div className='content'>
            <div className='left'>
              <h1 className="title">
                GARBAGE BE LIKE... <br></br> JUST LIKE...
              </h1>
              <h3 className='dsc'>请不要为难我，我只是一个小猫咪！</h3>
              <div className='buttons'>
                <div className='button' onClick={() => this.buttonClick({
                  content: '👋你点击了button！',
                  type: 'primary'
                })}>Button</div>
                <div className='cancel' onClick={() => this.buttonClick({
                  content: '🤚你点击了cancel！',
                  type: 'normal'
                })}>Cancel</div>
              </div>
            </div>
            <div className='right' onClick={() => this.buttonClick({
              content: '喵喵喵~',
              type: 'normal'
            })}>
            </div>
          </div>
        </main>
        <globalComponent.Tips tips={this.state.tips} />
        {globalComponent.Timer()}
      </div>
    )
  }
}

export default Home