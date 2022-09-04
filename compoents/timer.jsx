import React from "react"
import style from "./timer.module.css"

function Timer() {
    return (
        <div className={style.timer}>
            <div className={style.progress}></div>
        </div>
    )
}

export default Timer