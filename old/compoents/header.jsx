import react from "react";
import style from "./header.module.css";
import { globalComponent, globalMethed, globalState } from "../pages/_app";

class Header extends react.Component {
  constructor(props) {
    super(props);
    this.state = { login_txt: String };
  }
  componentDidMount(e) {
    console.log(globalState);
    this.setState({
      login_txt: globalState.login_txt,
    });
  }

  gohome() {
    let end = setInterval(function () {}, 10000);
    for (let i = 1; i <= end; i++) {
      clearInterval(i);
    }
    globalMethed.gohome();
  }

  login() {
    console.log(this.props);
    //调用页面内方法
    this.props.login();
    this.setState({
      login_txt: "Hi,Tom",
    });
    globalState.login_txt = "Hi,Tom";
  }

  render() {
    return (
      <div className={style.header}>
        <div className={style.logo} onClick={this.gohome.bind(this)}></div>
        <div className={style.logIn} onClick={this.login.bind(this)}>
          {this.state.login_txt}
        </div>
      </div>
    );
  }
}

export default Header;
