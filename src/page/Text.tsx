import React from 'react'
import convertText from '../utils/convertText'

type Props = {
  text: string | undefined
}

const Text = ({ text }: Props) => typeof text === 'undefined' ? null : (
  <div className="text">{convertText(text)}</div>
)

export default Text
