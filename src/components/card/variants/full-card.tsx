import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardWordPairBlock } from 'components/card/card-shared-components/body'
import { CardFooterButton } from 'components/card/card-shared-components/footer'
import { CardAuthorDiv, CardNameDiv } from 'components/card/card-shared-components/heading'
import { CardTemplate } from 'components/card/template'
import { CardVariantComponent } from 'components/card/variants/types'

export const FullCard: CardVariantComponent = ({ card, width, height }) => {
  const wordPairs = card.words.map((word) => {
    return (
      <WordPairContainer highlightOnHover={true} highlightColor={'#ffffff'} key={word._id}>
        <WordContainer textAlign='right'>{word.en}</WordContainer>
        <Dash>—</Dash>
        <WordContainer textAlign='left'>{word.ru}</WordContainer>
      </WordPairContainer>
    )
  })

  return (
    <CardTemplate
      width={width}
      height={height}
      bodyColor={card.ui.bodyColor}
      wordsColor={card.ui.wordsColor}
    >
      <CardHeading>
        <CardName>{card.name}</CardName>
        <CardAuthor>{card.author.name}</CardAuthor>
      </CardHeading>

      <CardWordsContainer>{wordPairs}</CardWordsContainer>

      <Link to={`/card/${card._id}/check`}>
        <GoToCardCheck>Проверить себя </GoToCardCheck>
      </Link>
    </CardTemplate>
  )
}

const CardHeading = styled.div`
  padding: 10px 15px;
`
const CardName = styled(CardNameDiv)`
  font-size: 32px;
`
const CardAuthor = styled(CardAuthorDiv)`
  font-size: 22px;
`
const CardWordsContainer = styled.div``
const WordPairContainer = styled(CardWordPairBlock)`
  display: flex;
  align-items: center;
`
const WordContainer = styled.div<{ textAlign: string }>`
  font-size: 24px;
  width: 44%;
  text-align: ${(props) => props.textAlign};
`
const Dash = styled.span`
  font-size: 26px;
  margin: 0 8px;
  align-self: center;
`
const GoToCardCheck = styled(CardFooterButton)``
