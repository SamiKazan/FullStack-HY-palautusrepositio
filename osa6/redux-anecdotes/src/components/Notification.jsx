import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    borderStyle: notification ? 'solid' : 'none',
    borderColor: notification ? 'black' : 'none',
    padding: 10,
    borderWidth: notification ? 1 : 0
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification