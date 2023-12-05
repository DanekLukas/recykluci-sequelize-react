import React, { ReactNode, useContext, useRef } from 'react'
import { TCategory } from '../utils'
import FindForm from '../components/FindForm'
import { DataContext } from '../contexts/DataContext'
import { NavLink } from 'react-router-dom'

type Props = {
  children?: ReactNode
}

const Menu = ({ children }: Props) => {
  const findRef = useRef('')
  const menuRef = useRef<HTMLDivElement>(null)
  const { categories, item, cartCount } = useContext(DataContext)
  return (
    <div ref={menuRef} className='mobile menu'>
      {categories &&
        categories.map((i: TCategory, idx: number) => (
          <NavLink
            key={idx}
            to={i.safename}
            className={`inline ${i.safename === item.category ? 'red' : ''} ${['vse', 'prodano'].includes(i.safename) ? 'redBulb' : ''}`}
          >
            {i.name}
          </NavLink>
        ))}
      <div className='search-bar'>
        <FindForm
          find={findRef.current}
        />
        <NavLink
          to={'/kosik'}
          className="cart"
        >
          {cartCount}
        </NavLink>

        {children}
        <button type="button" className='burger-menu' onClick={() => { menuRef.current!.classList.toggle('mobile') }}>☰</button>
      </div>
    </div>
  )
}

export default Menu
