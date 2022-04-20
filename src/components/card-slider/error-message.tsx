import React from 'react'
import styled from 'styled-components'

export const SliderErrorMessage: React.FC<{ text: string }> = ({ text }) => {
  return <Container>{text}</Container>
}

const Container = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
`
