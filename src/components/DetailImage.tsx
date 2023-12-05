import React from 'react'
import { getWidthHeight } from '../utils'
import Image from './Image'
import {type Image as TImage} from '../gql/types'

type Props = {
  item: Array<TImage | null> | null
  alt: string
  width: number
  height: number
  show: number | undefined
  setShow: React.Dispatch<React.SetStateAction<number | undefined>>
}

const DetailImage = ({ item, alt, width, height, show, setShow }: Props) => {
  const mobileWidthLimit = 540
  const focus = 5

  return (
    typeof show === 'undefined' ||
    item === null ? null :
      (window.innerWidth > mobileWidthLimit ? (
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setShow(undefined)
          }}
          type='button'
          className='centered'
        >
          <div style={{ width: 30, height: '100%', display: 'flex' }}>
            {show > 0 && (
              <button
                type='button'
                className='left-arrow'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShow(show > 0 ? (show || 1) - 1 : undefined)
                }}
              >
                <img src='/img/arrow_left.png' alt='předchozí' width={30} height={80} />
              </button>
            )}
          </div>
          {(() => {
            const splited = item[show]!.imageName!.split('_',4)
            const [gotWidth, gotHeight] =
            item === null
              ? [0, 0]
              : getWidthHeight(
                parseInt(splited[1],10),
                parseInt(splited[2],10),
                window.innerWidth,
                window.innerHeight,
                30
              )
            if (item !== null)
              return (
                <Image
                  src={item[show]!.imageName!}
                  alt={alt}
                  className='loading'
                  width={gotWidth}
                  height={gotHeight}
                />
              )
          })()}
          <div style={{ width: 30, height: '100%', display: 'flex' }}>
            {show < (item?.length || 0) - 1 && (
              <button
                type='button'
                className='right-arrow'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShow(
                    typeof show === 'undefined'
                      ? undefined
                      : show + 1 < (item?.length || 0)
                        ? show + 1
                        : undefined
                  )
                }}
              >
                <img src='/img/arrow_right.png' alt='následující' width={30} height={80} />
              </button>
            )}
          </div>
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            const link = document.createElement('meta')
            const name = 'name'
            const viewport = 'viewport'
            const content = 'width=device-width, maximum-scale=1.0, initial-scale=1.0'
            const contentInc = `width=device-width, maximum-scale=${focus}.0, initial-scale=1.0`
            link.setAttribute(name, viewport)
            link.content = contentInc
            const node = document.getElementsByTagName('head')[0].getAttributeNode(name)
            if (node) {
              document.getElementsByTagName('head')[0].removeChild(node)
            }
            link.content = content
            document.getElementsByTagName('head')[0].appendChild(link)
            setTimeout(() => {
              document.getElementsByTagName('head')[0].removeChild(link)
              link.content = contentInc
              document.getElementsByTagName('head')[0].appendChild(link)
            // window.scrollTo(0, scrollRef.current);
            }, 0)
            setShow(undefined)
          }}
          className='fullscreen centered'
        >
          {(() => {
            if (item === null || item === null) return
            const splited = item[show]!.imageName!.split('_',4)
            const [gotWidth, gotHeight] = getWidthHeight(
              parseInt(splited[1],10),
              parseInt(splited[2],10),
              width * focus,
              height * focus
            )
            return (
              <Image
                src={item[show]!.imageName!}
                alt={alt}
                className='loading'
                width={gotWidth}
                height={gotHeight}
              />
            )
          })()}
        </button>
      ))
  )
}

export default DetailImage
