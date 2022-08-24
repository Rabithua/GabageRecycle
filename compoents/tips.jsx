import React from "react"

class Tips extends React.Component {
    render() {

        var Tips = this.props.tips.map((tip, key) => (
            <div className={'tip ' + tip.type} key={key}>{tip.content}
                <style jsx>{`
                 .tip {
                     opacity: 0;
                     margin: 0.3rem;
                     padding: 0.5rem 1rem;
                     font-size: 1rem;
                     border-radius: 5px;
                     animation: show 500ms 300ms forwards;
                     box-shadow: 5px 5px 20px #00000005;
                 }
                 
                 .primary {
                     background-color: #07C160;
                     color: #ffffff;
                 }

                 .normal {
                    background-color: #ffffff;
                    color: #07C160;
                }

                .warning {
                    background-color: #FF6961;
                    color: #ffffff;
                }
            `}</style>
            </div>
        ))

        return (
            <div className="tips">
                {Tips}
                <style jsx>{`
            .tips {
                align-items: end;
                display: flex;
                position: fixed;
                right: 0;
                margin: 5rem 3rem;
                flex-direction: column;
                top: 0;
            }

             `}</style>
            </div>
        )
    }
}

export default Tips