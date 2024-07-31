import { useState } from "react"

const ToggleableBlog = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVis = { display: visible ? 'none' : ''}
    const showWhenVis = { display: visible ? '' : 'none'}

    const toggleVis = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVis}>
                <button onClick={toggleVis}>view</button>
            </div>
            <div style = {showWhenVis}>
                {props.children}
                <button onClick={toggleVis}>hide</button>
            </div>
        </div>
    )
}

export default ToggleableBlog