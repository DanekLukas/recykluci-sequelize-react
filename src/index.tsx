import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider, } from 'urql'
import { Client, cacheExchange, fetchExchange } from '@urql/core'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { TCategory, TDelivery, TDetail, TInCategory, TItem, TRoutes, addCookie } from './utils'
import DataProvider from './contexts/DataProvider'
import Layout from './components/Layout'
import Header from './components/Header'
import Menu from './page/Menu'
import MyRoutes from './RecykluciRoutes'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const client = new Client({
  url: '/graphql/',
  exchanges: [cacheExchange, fetchExchange],
})

const cookieName = 'analytics'

const cookies: { [index: string]: string } = {}
document.cookie.split(';').forEach(i => { const k = i.split('=', 2); cookies[k[0].trim()] = k[1] })
if (!Object.keys(cookies).includes(cookieName)) {
  const ls = localStorage.getItem('cookies')
  if (ls !== null && ['allowed', 'denied'].includes(ls)) {
    addCookie(cookieName, ls)
    cookies[cookieName] = ls
  }
}

const vars: { routes: TRoutes[], category: TCategory[], delivery: TDelivery[], basket: TRoutes[], data: TInCategory[], detail: TDetail | undefined, text: string | undefined, item: TItem } = { routes: [], category: [], delivery: [], basket: [], data: [], detail: undefined, text: undefined, item: { category: '', name: undefined } }
document
  .querySelector('#start')
  ?.innerHTML!.match(/[^=\n]+(?=\n)/g)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ?.forEach((i) => { const tmp = JSON.parse(i); Object.keys(tmp).forEach(k => { if (Object.keys(vars).includes(k)) { vars[k as keyof typeof vars] = tmp[k as keyof typeof tmp] as any } }) })

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <MantineProvider>
          <DataProvider categories={vars.category} delivery={vars.delivery} text={vars.text} item={vars.item} basket={vars.basket}>
            <Layout gdpr={(Object.keys(cookies).includes(cookieName) ? cookies[cookieName] : undefined) as never} getText={() => { }/*getText*/}>
              <Header
                goHome={() => {
                  // setItem(homepage)
                }}
              >
                <Menu />
              </Header>

              <MyRoutes routes={vars.routes} />
            </Layout>
          </DataProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
