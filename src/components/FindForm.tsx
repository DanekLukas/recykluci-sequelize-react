import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  find: string
}

const FindForm = ({ find }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  return (
    <form
      className='search-form'
      onSubmit={e => {
        e.preventDefault()
        navigate(`/najdi/${inputRef.current?.value || ''}`)
      }}
    >
      <input type='text' ref={inputRef} defaultValue={find} />
      <button type='submit' className='search-button'>
        <img src={'/img/lupa.svg'} alt='hledat' width={32} height={32} />
      </button>
    </form>
  )
}

export default FindForm
