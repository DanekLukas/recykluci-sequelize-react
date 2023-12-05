import { getImagePath } from '../utils'
import React, { useContext, useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import DetailImage from '../components/DetailImage'
import { useGetDetailQuery } from '../gql/getDetail.generated'
import { DataContext } from '../contexts/DataContext'
import { useAddToBasketMutation } from '../gql/addToBasket.generated'
import { Data, Image } from '../gql/types'

type Props = {
  category: string
  name: string
  reset?: boolean
}

const Detail = ({ category, name, reset = true }: Props) => {
  const nameRef = useRef<string>()
  const width = 600
  const height = 400
  const [show, setShow] = useState<number>()
  const pausedDetailRef = useRef(true)
  const detailRef = useRef<(Data | null)[]>()
  const imageRef = useRef<(Image | null)[] | null>()
  const { setCartCount, setItem } = useContext(DataContext)

  const [{ data: dataDetail, fetching: fetchingDetail }, refreshDetail] =
    useGetDetailQuery({
      variables: { name },
      requestPolicy: 'network-only',
      pause: pausedDetailRef.current,
    })

  if (!pausedDetailRef.current && !fetchingDetail && dataDetail && dataDetail.data) {
    pausedDetailRef.current = true;
    ({data: detailRef.current, image: imageRef.current} = dataDetail)
  }

  if (reset) {
    reset = false
    const nm = `${category}/${name}`
    if (nm !== nameRef.current) {
      setItem({ category, name })
      detailRef.current = undefined
      pausedDetailRef.current = false
      refreshDetail()
    }
    nameRef.current = nm
  }

  const [, runAddToBasket] = useAddToBasketMutation()

  return (
    detailRef.current ? (
      <>
        <DetailImage
          item={imageRef.current!}
          alt={detailRef.current[0]!.name!}
          width={width}
          height={height}
          show={show}
          setShow={setShow}
        />
        <BackButton />
        <div className='wrapper'>
          <div className='desc-detail'>
            <h2 className='detail-title'>{detailRef.current[0]!.name}</h2>
            <p>{detailRef.current[0]!.text}</p>
            <p>Cena: {detailRef.current[0]!.price},- Kč</p>
            {!detailRef.current[0]!.baskets?.find(i => i?.date > (Date.now() - 3600 * 2)) &&
              !detailRef.current[0]!.sells_items !== null && (
              <button
                type='button'
                className='buy red-bulb-before'
                onClick={() => {
                    detailRef.current![0]!.baskets?.push({id: 0, date: new Date()}) 
                    runAddToBasket({ id: detailRef.current![0]!.id })
                    // result.data?.addToBasket
                    setCartCount(prev => ++prev)
                }}
              >
                <div className='buy inline-block'>Přidat do košíku</div>
              </button>
            )}
          </div>
          {imageRef.current!.map((i, idx: number) => (
            <div className='detail-list' key={idx}>
              <img
                src={getImagePath(i!.imageName!, width, height)}
                alt={detailRef.current![0]!.name! || ''}
                key={idx}
                onClick={() => {
                  setShow(idx)
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </>
    ) : null
  )
}
export default Detail
