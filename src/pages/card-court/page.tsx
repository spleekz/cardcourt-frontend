import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { Search } from './search'
import { Court } from './court/court'
import { useMainSlider } from '../../app'
import { Preloader } from '../../components/icons/preloader'
import { useSearchParams } from 'react-router-dom'
import { PortalToBody } from '../../components/portal-to-body'

export const CardCourtPage: React.FC = registerPage(
  observer(() => {
    const mainSlider = useMainSlider()
    const [searchParams] = useSearchParams()

    // Поток: вводим поиск -> устанавливаем поиск в url -> компонент заново рендерится
    // -> сетаем поиск в слайдер -> слайдер изнутри заново заполняется карточками
    useEffect(() => {
      const search = searchParams.get('query') || ''
      if (mainSlider.cards.length === 0 || search !== mainSlider.paramsForCardRequest.search) {
        mainSlider.setSearchAndReset(search)
      }
    }, [searchParams])

    if (mainSlider.isLoading.value) {
      return (
        <PortalToBody>
          <Preloader />
        </PortalToBody>
      )
    }

    return (
      <Container>
        <Search />
        <Court />
      </Container>
    )
  })
)

const Container = styled.div`
  flex: 1 0 auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
