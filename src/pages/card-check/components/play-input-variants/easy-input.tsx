import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CellPosition, EasyInputStore } from 'stores/card-check-store/play-session/easy-input-store'

import { useClickOutside } from 'hooks/use-click-outside'
import { usePressedKeys } from 'hooks/use-pressed-keys'
import { useShortcut } from 'hooks/use-shortcut'

import { PlayInputProps } from './play-input'

type InputCellsRefs = Array<Array<HTMLInputElement | null>>
type AddCellRefToArrayConfig = { ref: HTMLInputElement | null; position: CellPosition }

type Props = PlayInputProps<EasyInputStore>

export const EasyPlayInput: React.FC<Props> = observer(({ inputStore, value, onKeyPress }) => {
  //!Преобразование value для отрисовки в клетках
  const valueWithoutSpaces = value.split(' ').join('')
  const valueWithoutSpacesAndSkips = Array.from({ length: valueWithoutSpaces.length }, (_, index) => {
    if (valueWithoutSpaces[index] && valueWithoutSpaces[index] !== '_') {
      return valueWithoutSpaces[index]
    }
    return ''
  })

  //!Массив рефов инпутов
  const inputCellsRefs = useRef<InputCellsRefs>([])

  const addCellRefToArray = ({ ref, position }: AddCellRefToArrayConfig): void => {
    const { wordIndex, cellIndex } = position
    if (position.wordIndex === 0 && position.cellIndex === 0) {
      inputCellsRefs.current = Array.from({ length: inputStore.words.length }, () => [])
    }
    inputCellsRefs.current[wordIndex][cellIndex] = ref
  }

  useEffect(() => {
    if (inputStore.currentCellPosition) {
      const { wordIndex, cellIndex } = inputStore.currentCellPosition
      inputCellsRefs.current[wordIndex][cellIndex]?.focus()
    }
  }, [inputStore.currentCellPosition])

  //!Обработка клика вне инпутов
  const inputRef = useRef<HTMLInputElement>(null)
  useClickOutside({
    ref: inputRef,
    fn: inputStore.unfocusAndUnselectCells,
  })

  //!Сочетания клавиш для выделения клеток
  const [selectAllCellsKeyDown, selectAllCellsKeyUp] = useShortcut(
    ['ControlLeft', 'KeyA'],
    inputStore.selectAllCells,
  )

  const [shiftArrowRightKeyDown, shiftArrowRightKeyUp] = useShortcut(
    ['ShiftLeft', 'ArrowRight'],
    inputStore.onShiftArrowRight,
    { repeatable: true },
  )

  const [shiftArrowLeftKeyDown, shiftArrowLeftKeyUp] = useShortcut(
    ['ShiftLeft', 'ArrowLeft'],
    inputStore.onShiftArrowLeft,
    { repeatable: true },
  )

  //!Обработчики
  const [inputPressedKeys, addInputPressedKey, deleteInputPressedKey] = usePressedKeys()

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace') {
      e.preventDefault()
      inputStore.onBackspacePress()
    }
  }
  const handleDeleteKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Delete') {
      e.preventDefault()
      inputStore.onDeletePress()
    }
  }
  const handleArrows = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    //Если нажаты ТОЛЬКО стрелки (не в сочетании с другими клавишами)
    if (inputPressedKeys.size === 1) {
      if (e.code === 'ArrowLeft') {
        inputStore.onArrowLeft()
      }
      if (e.code === 'ArrowRight') {
        inputStore.onArrowRight()
      }
    }
  }

  const handleKeysDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    addInputPressedKey(e.code)

    handleArrows(e)
    handleBackspace(e)
    handleDeleteKey(e)

    selectAllCellsKeyDown(e)
    shiftArrowRightKeyDown(e)
    shiftArrowLeftKeyDown(e)
  }
  const handleKeysUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    deleteInputPressedKey(e.code)

    selectAllCellsKeyUp(e)
    shiftArrowRightKeyUp(e)
    shiftArrowLeftKeyUp(e)
  }

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    onKeyPress(e)
    inputStore.onKeyPress(e.key)
  }

  //Порядковый номер клетки
  let cellOrderNumber = -1

  return (
    <Container ref={inputRef}>
      {inputStore.words.map((word, wordIndex) => {
        return (
          <WordContainer key={wordIndex}>
            {word.map((cell, cellIndex) => {
              cellOrderNumber = cellOrderNumber + 1
              return (
                <InputCell
                  ref={(cellRef) =>
                    addCellRefToArray({ ref: cellRef, position: { wordIndex, cellIndex } })
                  }
                  key={cellIndex}
                  value={valueWithoutSpacesAndSkips[cellOrderNumber]}
                  focused={cell.focused}
                  selected={cell.selected}
                  onClick={() => inputStore.setCurrentCellPosition({ wordIndex, cellIndex })}
                  onKeyPress={onKeyPressHandler}
                  onKeyDown={handleKeysDown}
                  onKeyUp={handleKeysUp}
                />
              )
            })}
          </WordContainer>
        )
      })}
    </Container>
  )
})

const Container = styled.div``
const WordContainer = styled.span`
  margin: 0 21px;
`
const InputCell = styled.input<{ focused: boolean; selected: boolean }>`
  width: 50px;
  height: 70px;
  font-size: 40px;
  margin: 0 10px;
  text-align: center;
  border: 2px solid #373737;
  border-radius: 6px;
  background-color: ${(props) => (props.focused && '#85ffac') || (props.selected && '#fffb85')};
  caret-color: transparent;
`
