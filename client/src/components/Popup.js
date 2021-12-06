function Modal({ children, setIsOpen }) {

  function closePopup() {
    setIsOpen(false);
  }

    return (
      <div className='popup'>
          <div className='close-popup-button' onClick={closePopup}>X</div>
          {children}
      </div>  
    )
}

export default Modal; 