import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../../api/api'
import { observer } from 'mobx-react-lite'
import { WordList } from '../../word-list'
import { useStore } from '../../../stores/root-store/context'
import { PencilIcon } from '../../../svg/pencil-icon'

export interface ICardElementProps {
  card: Card
}

export const CardElement: React.FC<ICardElementProps> = observer(({ card }) => {
  const { cardsStore } = useStore()

  const navigate = useNavigate()

  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): void => {
    e.preventDefault()
    cardsStore.deleteCard(id)
  }
  const goToEditCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    navigate(`/card/${card._id}/edit`)
  }

  return (
    <Link key={card._id} to={`/card/${card._id}`}>
      <CardContainer key={card._id} color={card.ui.headColor}>
        <EditButton onClick={(e) => goToEditCard(e)}>
          <PencilIcon />
        </EditButton>
        <CardHeading color={card.ui.headColor}>
          <CardName>{card.name}</CardName>
          <CardAuthor>{card.author}</CardAuthor>
        </CardHeading>
        <CardWords color={card.ui.bodyColor} isHover>
          <WordList card={card} />
        </CardWords>
        <DeleteButton onClick={(e) => deleteCard(e, card._id)}>Удалить</DeleteButton>
      </CardContainer>
    </Link>
  )
})

export const CardContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  width: 320px;
  height: 500px;
  margin: 0 8px 0 8px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  overflow: hidden;
`
export const CardHeading = styled.div<{ color: string }>`
  padding: 2px 15px;
  background-color: ${(props) => props.color};
`
const CardName = styled.div`
  font-size: 40px;
  font-weight: bold;
`
export const CardAuthor = styled.div`
  font-size: 25px;
  color: #000000a0;
`
export const CardWords = styled.div<{ color: string; isHover: boolean }>`
  min-height: 502px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 10px;
  background-color: ${(props) => props.color};
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
  transition: 0.4s;
  :hover {
    top: ${(props) => props.isHover && '-90px'};
  }
`
const EditButton = styled.button``
const DeleteButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  font-size: 28px;
`