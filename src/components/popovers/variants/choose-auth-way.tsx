import React from 'react'

import { Link } from 'react-router-dom'

import { Popover, PopoverVariantProps } from '../popover'
import { PopoverList, PopoverListItem } from '../shared-components'

export const ChooseAuthWayPopover: React.FC<PopoverVariantProps> = ({
  fnForClosing,
  afterClose,
  isOpened,
  elementForActivating,
}) => {
  return (
    <Popover
      width={'100%'}
      top={60}
      fnForClosing={fnForClosing}
      afterClose={afterClose}
      isOpened={isOpened}
      elementForActivating={elementForActivating}
    >
      <PopoverList>
        <PopoverListItem>
          <Link to='/login'>Войти</Link>
        </PopoverListItem>
        <PopoverListItem>
          <Link to='/registration'>Создать аккаунт</Link>
        </PopoverListItem>
      </PopoverList>
    </Popover>
  )
}
