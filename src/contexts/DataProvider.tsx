import React, { ReactNode, useState } from 'react'
import { DataContext } from './DataContext'
import { TCategory, TDelivery, TItem, TRoutes } from '../utils'

type Props = {
  children: ReactNode
  delivery: TDelivery[]
  categories: TCategory[]
  basket: TRoutes[]
  text: string | undefined
  item: TItem
};

const DataProvider = ({ delivery, text, categories, basket, item:passedItem, children }: Props) => {
  const [cartCount, setCartCount] = useState(basket.length)
  const [item, setItem] = useState(passedItem)

  return (
    <DataContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        delivery,
        text,
        categories,
        item,
        setItem,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
