import react from "react";
import style from "./header.module.css"

class Header extends react.Component {
    constructor(props) {
        super(props);
        this.state = { login_txt: 'LogIn' };
    }

    login() {
        console.log(this.props)
        this.props.login()
        this.setState({
            login_txt: 'Hi,Tom'
        })
    }

    render() {
        return (
            <div className={style.header}>
                <div className={style.logo}></div>
                <div className={style.logIn} onClick={this.login.bind(this)}>{this.state.login_txt}</div>
            </div>
        )
    }
}

export default Header