import React from 'react'
import { getImagePath } from '../utils'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  className: string
}
const Image = ({ src, alt, width, height, className }: Props) => (
  <img src={getImagePath(src, width, height)} alt={alt} className={className} loading='lazy' />
)

export default Image
