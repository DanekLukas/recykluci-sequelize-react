import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  goHome: () => void
  children: ReactNode
}

const Header = ({ children }: Props) => {
  return (
    <div className='header'>
      <NavLink
        to='/'
        style={{ textDecoration: 'none' }}
      >
        <h1 className='head'>Recykluci</h1>
        <div className='retroshop'>Retro shop</div>
      </NavLink>
      {children}
    </div>
  )
}

export default Header
