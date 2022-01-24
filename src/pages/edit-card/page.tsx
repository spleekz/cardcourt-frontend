import { observer } from 'mobx-react-lite'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { useCard } from '../../hooks/use-card'
import { usePage } from '../../hooks/use-page'

export const EditCardPage: React.FC = observer(() => {
  usePage(true)

  const { cardId } = useParams()

  const card = useCard(cardId)

  return <EditCardPageContainer>{card && <CardRef type='form' card={card} />}</EditCardPageContainer>
})

const EditCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
