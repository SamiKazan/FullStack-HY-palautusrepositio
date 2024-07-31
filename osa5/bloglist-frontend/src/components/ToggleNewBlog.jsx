import { useState } from "react"

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVis = { display: visible ? 'none' : ''}
    const showWhenVis = { display: visible ? '' : 'none'}

    const toggleVis = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVis}>
                <button onClick={toggleVis}>{props.buttonLabel}</button>
            </div>
            <div style = {showWhenVis}>
                {props.children}
                <button onClick={toggleVis}>cancel</button>
            </div>
        </div>
    )
}

export default Toggleable