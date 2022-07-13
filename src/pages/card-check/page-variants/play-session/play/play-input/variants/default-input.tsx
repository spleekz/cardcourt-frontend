import React, { CSSProperties, useCallback } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { DefaultInputStore } from 'stores/card-check-store/play-session/default-input-store'

type Props = {
  inputStore: DefaultInputStore
  readonly?: boolean
  value: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  styles?: CSSProperties
}

export const DefaultPlayInput: React.FC<Props> = observer(
  ({ inputStore, readonly, value, onKeyDown, styles }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      inputStore.setValue(e.target.value)
    }

    const setInputRefToStore = useCallback((ref: HTMLInputElement | null): void => {
      inputStore.setInputElement(ref)
    }, [])

    return (
      <StyledInput
        ref={setInputRefToStore}
        readOnly={readonly}
        value={value}
        placeholder={`Напечатайте перевод`}
        onFocus={inputStore.setInputFocused}
        onBlur={inputStore.setInputUnfocused}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        style={styles}
      />
    )
  },
)

const StyledInput = styled.input`
  width: 580px;
  border: 2px solid #373737;
  font-size: 40px;
  padding: 4px;
  border-radius: 6px;
  margin-right: 20px;
`
