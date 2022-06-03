import React from 'react'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardCheckBlockTemplate } from 'pages/card-check/check-block-template'
import { useCheckStore } from 'pages/card-check/original-content'

import { BlueButton } from 'components/buttons/blue-button'

import { usePlaySession } from '../play-session'
import { getResultTitle } from './get-result-title'
import { ResultErrorWords } from './sections/error-words/error-words'

export const CardCheckResult: React.FC = observer(() => {
  const checkStore = useCheckStore()
  const { card } = checkStore
  const playSession = usePlaySession()

  const resultTitleText = getResultTitle({
    card,
    wordsCount: playSession.words.length,
    correctWordsCount: playSession.correctWords.length,
  })

  return (
    <CardCheckBlockTemplate width={1100} height={700}>
      <>{resultTitleText}</>
      <>
        <ContentContainer>
          <Sections>{playSession.errorWords.length > 0 && <ResultErrorWords />}</Sections>
        </ContentContainer>
      </>
      <>
        <RedirectButtons>
          <StyledLink to={'/'}>
            <RedirectButton>На главную</RedirectButton>
          </StyledLink>
          <RedirectButton withMargin={true} onClick={checkStore.goToSettings}>
            Повторить проверку
          </RedirectButton>
          <StyledLink to={`/card/${checkStore.card._id}`}>
            <RedirectButton>На страницу карточки</RedirectButton>
          </StyledLink>
        </RedirectButtons>
      </>
    </CardCheckBlockTemplate>
  )
})

const ContentContainer = styled.div``
const Sections = styled.div``
const RedirectButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const RedirectButton = styled(BlueButton)<{ withMargin?: boolean }>`
  font-size: 26px;
  margin: ${(props) => props.withMargin && `0 8px`};
  width: 300px;
  height: 60px;
`
const StyledLink = styled(Link)`
  font-size: 26px;
`
