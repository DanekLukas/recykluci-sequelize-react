import { createContext } from 'react'
import { TCategory, TDelivery, TItem } from '../utils'

type State = {
  delivery: TDelivery[]
  categories: TCategory[]
  text: string | undefined
  item: TItem
  setItem: React.Dispatch<React.SetStateAction<TItem>>
  cartCount: number,
  setCartCount: React.Dispatch<React.SetStateAction<number>>
};

export const DataContext = createContext<State>({
  delivery: [],
  categories: [],
  text: '',
  item: {name:'', category: ''},
  setItem: () => {},
  cartCount: 0,
  setCartCount: () => {}
})
