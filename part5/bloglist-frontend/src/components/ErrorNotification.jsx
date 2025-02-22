const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={notificationStyle} className="error">
      <strong>{message}</strong>
    </div>
  )
}

export default ErrorNotification