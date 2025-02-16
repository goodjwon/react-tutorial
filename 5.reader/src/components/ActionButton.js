import React from 'react'

const ActionButton = ({ isButtonActive, onClick }) => {
  if (!isButtonActive) {
    return null
  }

  return <button onClick={onClick}>액션 버튼</button>
}

export default ActionButton