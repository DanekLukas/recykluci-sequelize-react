import { Fragment } from 'react'
const convertText = (text: string) =>
  text.split('\r\n\r\n')?.map((i, idx) => (
    <p key={idx}>
      {i
        .replaceAll('\r', '')
        .split('\n')
        .map((j, idx) => (
          <Fragment key={idx}>
            {j.replaceAll('  ', '\u00A0')}
            <br />
          </Fragment>
        ))}
    </p>
  ))
export default convertText
