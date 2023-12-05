export type TItem = {
  category: string
  name: string | undefined
}

export type TCategory = {
  name: string
  safename: string
  category_id?: number
}

export type TImage = {
  id: number
  name: string
  mime: string
  width: number
  height: number
}

export type TInCategory = {
  name: string
  safename: string
  category: string
  reserved: boolean
  in_basket: boolean
  sold: boolean
  price: number
  image: TImage | null
}

export type TDetail = {
  id: number
  name: string
  safename: string
  category: string
  text: string
  price: number
  reserved: boolean
  in_basket: boolean
  sold: boolean
  images: TImage[] | null
}

export type TCart = {
  id: number
  name: string
  safename: string
  price: number
  size_id: number
  images: TImage[]
}

export type TDelivery = {
  id: number
  name: string
  type: number
  price: number
  cod: number
  inc: number
  size_id: number | null
}

export type TRoutes = {
  name: string
  safename: string
  category: TCategory
}

export const getWidthHeight = (
  widthI: number,
  heightI: number,
  widthS: number,
  heightS: number,
  border = 0
) => {
  const aspectRI = widthI / heightI
  const width = widthS - border
  const height = heightS - border
  const res1 = [width, Math.round(width / aspectRI)]
  const res2 = [Math.round(height * aspectRI), height]

  if (res1[0] > res2[0]) return res2
  return res1
}

export const getImagePath = (image: string, width: number, height: number) => {
  const splited = image.split('_')
  const widthI = parseInt(splited[1],10)
  const heightI = parseInt(splited[2], 10)
  const res = getWidthHeight(widthI, heightI, width, height)
  splited[1] = res[0].toString()
  splited[2] = res[1].toString()
  return `/image/${splited.join('_')}`
}

export const prepareImageName = (i: TImage, width: number, height: number) => {
  const sp = i.name.split('.')
  const wh = getWidthHeight(i.width, i.height, width, height)
  const nm = sp.splice(0, sp.length - 1)
  return `${i.id}_${wh[0]}_${wh[1]}_${nm.concat(i.mime.split('/')[1]).join('.')}`
}

export const setLocation = (path: string, useLocation = true) => {
  window.history.pushState(null, '', window.location.href)
  window.history.replaceState(null, '', useLocation ? `${window.location.origin}/${path}` : path)
}

export const addCookie = (cookieName: string, analytics: string) => {
  document.cookie = `${cookieName}=${analytics}; SameSite=Lax; Secure`
}  
