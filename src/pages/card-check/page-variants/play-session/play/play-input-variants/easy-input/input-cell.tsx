import React from 'react'

import { observer } from 'mobx-react-lite'
import { CaretDownFill } from 'react-bootstrap-icons'
import styled from 'styled-components'

type Props = {
  value: string
  focused: boolean
  selected: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InputCell = observer<Props, HTMLInputElement | null>(
  ({ value, focused, selected, onChange, onClick, onKeyPress, onKeyDown, onKeyUp }, ref) => {
    return (
      <Container>
        {focused && (
          <Caret>
            <CaretDownFill size={28} />
          </Caret>
        )}
        <Cell
          ref={ref}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          selected={selected}
        />
      </Container>
    )
  },
  { forwardRef: true },
)
InputCell.displayName = 'InputCell'

const Container = styled.div`
  position: relative;
`
const Cell = styled.input<{ selected: boolean }>`
  width: 50px;
  height: 70px;
  font-size: 40px;
  margin: 0 10px;
  text-align: center;
  border: 2px solid #373737;
  border-radius: 6px;
  background-color: ${(props) => props.selected && '#fffb85'};
  caret-color: transparent;
`
const Caret = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
`