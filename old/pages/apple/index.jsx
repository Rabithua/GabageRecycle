import Head from "next/head";
import React from "react";
import Header from "../../compoents/header";
import style from "./style.module.css";
import Router from "next/router";
import { globalComponent, globalMethed, globalState } from "../_app";

class Apple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
      cleartips_timer: null,
    };
  }

  componentDidMount(e) {
    console.log(globalComponent);
    setTimeout(() => {
      Router.push("/");
    }, 12000);
  }

  buttonClick(tip) {
    if (this.state.cleartips_timer) {
      clearTimeout(this.state.cleartips_timer);
    }

    var tips = this.state.tips;
    var newtips = [...tips];
    newtips.push(tip);

    var cleartips_timer = setTimeout(() => {
      this.setState({
        tips: [],
      });
    }, 2000);

    this.setState({
      tips: newtips,
      cleartips_timer: cleartips_timer,
    });
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>Apple</title>
          <link rel="icon" href="/cat.ico" />
          <link rel="stylesheet" href="./style.css" />
        </Head>
        <Header
          login={() =>
            this.buttonClick({
              content: "💡现在你可以假装已经登陆了！",
              type: "primary",
            })
          }
        ></Header>
        <main>
          <div className="line"></div>
          <div className="content">
            <div className="left">
              <h1 className="title">
                上帝丢了一个苹果给我，感谢上帝，它很好吃！
              </h1>
              <h3 className="dsc">It would be better if durian.</h3>
            </div>
          </div>
          <div className={style.appleContainer}>
            <div className={style.apple}></div>
          </div>
        </main>

        <globalComponent.Tips tips={this.state.tips} />
        {globalComponent.Timer()}
      </div>
    );
  }
}

export default Apple;
