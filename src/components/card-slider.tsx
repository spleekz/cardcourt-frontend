import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { CardRef } from './cards/card-ref'
import { useStore } from '../stores/root-store/context'
import { ICardsSliderStore, SliderConfig } from '../stores/cards-slider-store'

interface NewSliderConfig {
  newSliderConfig: SliderConfig
}

interface Slider {
  slider: ICardsSliderStore
}

function CardSliderComponent(
  props: React.PropsWithChildren<NewSliderConfig>
): React.ReactElement | null
function CardSliderComponent(props: React.PropsWithChildren<Slider>): React.ReactElement | null

function CardSliderComponent(props: NewSliderConfig | Slider): React.ReactElement | null {
  const { cardsStore, createCardsSliderStore } = useStore()

  const isNewSlider = !('slider' in props)

  const [slider] = useState<ICardsSliderStore>(
    !isNewSlider ? props.slider : () => createCardsSliderStore(props.newSliderConfig)
  )

  const sliderWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    slider.setSliderPosition((slider.page - 1) * slider.pixelsToSlide)
  }, [])

  useEffect(() => {
    if (isNewSlider) {
      slider.initializeSlider()
    }
  }, [])

  return (
    <SliderContainer>
      {cardsStore.cards.length > 0 && slider.pageCount === 1 ? null : (
        <SliderButton onClick={slider.slideLeft} disabled={slider.page <= 1}>
          Назад
        </SliderButton>
      )}
      <SliderWindow
        ref={sliderWindowRef}
        cardWidth={slider.cardWidth}
        cardHeight={slider.cardHeight}
        cardsToShow={slider.cardsToShow}
      >
        <SliderLine position={slider.sliderPosition}>
          {slider.cards.map((card) => {
            return (
              <CardRef
                type='element'
                card={card}
                width={slider.cardWidth}
                height={slider.cardHeight}
                key={card._id}
              />
            )
          })}
        </SliderLine>
      </SliderWindow>
      {cardsStore.cards.length > 0 && slider.pageCount === 1 ? null : (
        <SliderButton onClick={slider.slideRigth} disabled={slider.page === slider.pageCount}>
          Вперёд
        </SliderButton>
      )}
      <PageCounter>
        {slider.page} / {slider.pageCount}
      </PageCounter>
    </SliderContainer>
  )
}

export const CardSlider = observer(CardSliderComponent)

const SliderContainer = styled.div`
  display: flex;
`
const SliderWindow = styled.div<{ cardWidth: number; cardHeight: number; cardsToShow: number }>`
  position: relative;
  width: ${(props) => `${props.cardWidth * props.cardsToShow + 8 * 2 * props.cardsToShow}px`};
  height: ${(props) => `${props.cardHeight}px`};
  border-radius: 16px;
  overflow: hidden;
`
const SliderLine = styled.div<{ position: number }>`
  display: flex;
  position: absolute;
  transform: ${(props) => `translateX(-${props.position}px)`};
  transition: 0.48s ease-out;
`
const SliderButton = styled.button`
  margin: 0 8px 0 8px;
`
const PageCounter = styled.div``