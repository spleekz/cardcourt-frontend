import { observer } from 'mobx-react-lite'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '../../components/Cards/Card'
import { useCard } from '../../hooks/useCard'

const EditCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EditCardPage: React.FC = observer(() => {
  const { cardId } = useParams()

  const card = useCard(cardId)

  return <EditCardPageContainer>{card && <Card type='form' card={card} />}</EditCardPageContainer>
})
