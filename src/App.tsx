import React, { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'

const GlobalStyles = createGlobalStyle`
 body {
  margin:0;
  padding:0;
  box-sizing:border-box;
  background-color:#89a4ff;
}
`
const AppContainer = styled.div``

export const App: FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
      </AppContainer>
    </>
  )
}
