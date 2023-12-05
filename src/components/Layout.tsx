import { Button, Checkbox } from '@mantine/core'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { addCookie } from '../utils'

type Props = {
  gdpr: string | undefined
  getText: (name: string) => void
  children: ReactNode
}

const Layout = ({ gdpr, getText, children }: Props) => {
  const [gdprOpened, setGdprOpened] = useState(false)
  const choiceRef = useRef<HTMLInputElement>(null)
  const [, updateState] = useState<object>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const toTopRef = useRef<HTMLButtonElement>(null)
  const gdprRef = useRef<string | undefined>(gdpr)

  useEffect(() => {
    forceUpdate()
  }, [])

  useEffect(() => {
    document.addEventListener('scroll',
      () => {
        if (toTopRef.current !== null) {
          toTopRef.current.style.display = window.scrollY > 100 ? 'block' : 'none'
          const footer = document.getElementById('footer')
          if (footer && footer.style.marginBottom.length === 0 && footer.getBoundingClientRect().top > window.innerHeight) {
            footer.style.setProperty('margin-bottom', '2vw')
          }
        }
      }
    )
  },
  [])

  const setCookies = (gdpr: boolean) => {
    localStorage.setItem('cookies', gdpr ? 'allowed' : 'denied')
    gdprRef.current = gdpr ? 'allowed' : 'denied'
    addCookie('analytics', gdprRef.current)
    forceUpdate()
  }

  return (
    <>
      <button type="button" className='move-top' ref={toTopRef} onClick={() => { window.scrollTo(0, 0) }}>
        <img src={'/img/top-arrow.svg'} alt="nahoru" width={50} height={50} />
      </button>
      {typeof gdprRef.current === 'undefined'
        ? <>
          <Modal
            title='Nastavení cookies'
            className='modal-fit'
            opened={gdprOpened}
            onClose={() => {
              setGdprOpened(false)
            }}
          >
            <form>
              <Checkbox ref={choiceRef} label='Sledování navštěvovanosti stránek' />
              <br />
              <Checkbox readOnly checked label='Soubory nezbytné pro funkci webu' />
              <br />
              <Button
                onClick={() => {
                  setCookies(choiceRef.current?.checked || false)
                  setGdprOpened(false)
                }}
              >
                Uložit nastavení
              </Button>
            </form>
          </Modal>
          {typeof gdprRef.current === 'undefined' && <div className='gdpr'>
            <form>
              Tento web používá cookies pro zlepšení uživatelského pohodlí.
              <button
                className='gdpr-button'
                type='button'
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setGdprOpened(true)
                }}
              >
                Upravit nastavení cookies
              </button>
              <button
                className='gdpr-button'
                type='button'
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setCookies(true)
                }}
              >
                Souhlasím s použitím cookies
              </button>
            </form>
          </div>}
        </>
        : null}
      <div className='container'><div>{children}</div></div>
      <div className='footer' style={{ transform: 'translateY(-1rem)' }} id='footer'>
        <div>
          <img
            src='/img/R_r.svg'
            width={32}
            height={32}
            className='logo padding-right'
            alt='Recykluci'
          />
          <div>
            <a href="/o-mne"
              className='clear inline'
              onClick={() => {
                getText('o-mne')
              }}
            >
              <span className='red'>⬤</span>&nbsp;mně
            </a>
          </div>
          <div>
            <a href="/obchodni-podminky"
              className='clear inline'
              onClick={() => {
                getText('obchodni-podminky')
              }}
            >
              <span className='red'>⬤</span>bchodní&nbsp;podmínky
            </a>
          </div>
        </div>
        <div>
          <a href='mailto:recykluci@seznam.cz' className='padding-right'>
            recykluci@seznam.cz
          </a>
          <div className='alignCenter'>
            <a href='https://www.facebook.com/antonin.kratochvil' target='_blank' rel='noreferrer'>
              <img src='/img/f.svg' className='logo' alt='facebook' width={32} height={32} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout
