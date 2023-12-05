import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import BackButton from '../components/BackButton'
import Image from '../components/Image'
import { useGetInCategoryQuery } from '../gql/getInCategory.generated'
import { useGetHomepageQuery } from '../gql/getHomepage.generated'
import { NavLink, useParams } from 'react-router-dom'
import { useFindQuery } from '../gql/find.generated'
import { DataContext } from '../contexts/DataContext'
import { Data } from '../gql/types'

type Props = {
  name: string
  reset?: boolean
}

const InCategory = ({ name, reset = true }: Props) => {
  const [, updateState] = useState<object>()
  const forceUpdate = useCallback(() => updateState({}), [])

  const nameRef = useRef<string>()
  const pausedRef = useRef(true)
  const pausedFindRef = useRef(true)
  const pausedHomepageRef = useRef(true)
  const itemsRef = useRef<(Data)[] | undefined>()
  const [{ data: dataIn, fetching: fetchingIn }, refreshIn] = useGetInCategoryQuery(
    {
      variables: { name },
      requestPolicy: 'network-only',
      pause: pausedRef.current,
    }
  )

  const { setItem } = useContext(DataContext)

  const { find } = useParams()

  useEffect(() => {
    if (!find || name !== nameRef.current) return
    pausedFindRef.current = false
    refreshFind()
  }, [find])


  if (!pausedRef.current && !fetchingIn && dataIn && dataIn.category) {
    pausedRef.current = true
    itemsRef.current = dataIn.category.map(i => i!.data as Data[]).flat(1)
    forceUpdate()
  }

  const [{ data: dataHome, fetching: fetchingHome }, refreshHome] =
    useGetHomepageQuery({
      requestPolicy: 'network-only',
      pause: pausedHomepageRef.current,
    })

  if (!pausedHomepageRef.current && !fetchingHome && dataHome && dataHome?.homepage) {
    pausedHomepageRef.current = true
    itemsRef.current = dataHome.homepage.map(i => i!.datum as Data)
    forceUpdate()
  }

  const [{ data: dataFind, fetching: fetchingFind }, refreshFind] = useFindQuery({
    variables: { name: find },
    requestPolicy: 'network-only',
    pause: pausedFindRef.current,
  })

  if (!pausedFindRef.current && !fetchingFind && dataFind && dataFind.find) {
    pausedFindRef.current = true
    itemsRef.current = dataFind.find as Data[]
    forceUpdate()
  }

  if (reset) {
    reset = false
    if (name !== nameRef.current) {
      setItem({ category: name, name: undefined })
      itemsRef.current = undefined
      if (name === '') {
        pausedHomepageRef.current = false
        refreshHome()
      }
      else {
        if (name === 'find') {
          pausedFindRef.current = false
          refreshFind()
        } else {
          pausedRef.current = false
          refreshIn()
        }
      }
    }
    nameRef.current = name
  }

  return (
    <>
      {name !== '' && itemsRef.current &&<BackButton />}
      <div className='row' key={1}>
        {itemsRef.current && itemsRef.current
          .filter(i => i?.id_image?.imageName !== null)
          .map((i, idx: number) => 
            i.sells_items?.find(i => i?.sell?.done || false) ? (
              <div key={idx} className='byFour border visible'>
                <Image src={i.id_image!.imageName!} alt={i.name!} width={600} height={400} className='fit' />
              </div>
            ) : (
              <div id={i.safename!} key={idx}>
                <NavLink
                  key={idx}
                  to={`${name === ''
                    ? `/${i.category?.safename}`
                    : `/${i.category?.safename}/${i.safename}`
                  }`}
                  className="category"
                >
                  <div
                    className={`byFour border visible ${!i.baskets?.map(i => i?.date) && !i.sells_items?.map(j => j?.sell?.done === false)}`}
                  >
                    <Image src={i.id_image!.imageName!} alt={i.name!} width={600} height={400} className='fit' />
                  </div>
                  <div className={`price category-name ${name === '' ? 'price-home-mobile' : 'home-text'}`}>
                    {<p>{name === '' ? i.name : ''}</p>}
                    <div className='incategory-name'><p className='n-text'>{name === '' ? '' : i.name }</p><div className='p-text'>{`${i.price} Kč`}</div></div>
                  </div>
                </NavLink>
              </div>
            )
          )}
      </div>
    </>
  )
}
export default InCategory
