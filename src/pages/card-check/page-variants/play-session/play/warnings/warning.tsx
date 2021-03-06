import React from 'react'

import styled from 'styled-components'

export const PlayWarning: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled.div`
  padding: 7px 15px;
  background-color: #d41c1c;
`
const Text = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`
