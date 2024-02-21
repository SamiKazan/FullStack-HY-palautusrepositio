const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    const type = message.includes('Error') 
    ? 'error' 
    : 'message'
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  export default Notification