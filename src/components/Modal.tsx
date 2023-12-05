import React, { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  opened: boolean
  onClose: () => void
  className?: string
}

const Modal = ({ title, children, opened, onClose, className }: Props) => {
  return (
    <div onClick={onClose} className='modal-bkg' style={{ display: opened ? 'block' : 'none' }}>
      <div>
        <div
          className={`modal ${className || ''}`}
          onClick={event => {
            event.stopPropagation()
          }}
        >
          <div>
            {title}
            <button onClick={onClose}>×</button>
          </div>
          <section className='modal-body'>{children}</section>
        </div>
      </div>
    </div>
  )
}
export default Modal
