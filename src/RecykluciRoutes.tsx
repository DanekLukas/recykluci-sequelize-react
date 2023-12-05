import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useRef } from 'react'
import Detail from './page/Detail'
import InCategory from './page/InCategory'
import { TRoutes } from './utils'
// import Cart from './page/Cart'

type Props = {
  routes: TRoutes[]
}

const MyRoutes = ({ routes }: Props) => {
  const treeRef = useRef<TRoutes[]>(routes)
  return treeRef.current && <Routes>
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treeRef.current.map((i: any, idx: number) => <>
        <Route key={idx} path={`/${i.safename}`} element={<InCategory name={i.safename} />} />
        {i.data.map((j: { safename: string }, idy: number) => <Route key={`${idx}_${idy}`} path={`/${i.safename}/${j.safename}`} element={<Detail category={i.safename} name={j.safename} />} />)}
      </>
      )}
    {['vse', 'prodano'].map((i, idx) => <Route key={idx} path={`/${i}`} element={<InCategory name={i} />} />)}
    <Route path={'/najdi/:find'} element={<InCategory name={'find'} />} />
    {/* <Route path={'/kosik'} element={<Cart />} /> */}
    <Route path={'/'} element={<InCategory name={''} />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
}
export default MyRoutes
