const notificationStyle = {
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}

const Notification = ({message, warning}) => {
    const warningColor =  warning ? 'red' : 'green'

    const styles = {...notificationStyle, color:warningColor}
    
    if (message === null) {
        return null
    }

    return (
        <div style={styles}>
        {message}
        </div>
    )
    }

export default Notification 