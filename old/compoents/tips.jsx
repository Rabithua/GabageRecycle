import React from "react"
import style from "./tips.module.css"

class Tips extends React.Component {
    render() {

        var Tips = this.props.tips.map((tip, key) => (
            <div className={style.tip + ' ' + style[tip.type]} key={key}>{tip.content}
            </div>
        ))

        return (
            <div className={style.tips}>
                {Tips}
            </div>
        )
    }
}

export default Tips