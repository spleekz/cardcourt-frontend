import { makeAutoObservable } from 'mobx'

import { StatusCodes } from 'api/api-utility-types'

import { notNull } from 'utils/basic'
import { getStatusByCode, isErrorCode, isUnknownError } from 'utils/server-codes'

export type LoadingStatus = 'initial' | 'loading' | 'success' | 'error'

type FlowStateConfig = {
  initialStatus?: LoadingStatus
  handledErrors: Array<StatusCodes>
}

export class LoadingState {
  handledErrors: Array<StatusCodes> = []

  constructor(config: FlowStateConfig) {
    const { initialStatus = 'initial', handledErrors } = config

    this.setStatus(initialStatus)
    this.handledErrors = handledErrors

    makeAutoObservable(this)
  }

  status: LoadingStatus = 'initial'
  setStatus(status: LoadingStatus): void {
    this.status = status
  }

  code: number | null = null
  setCode(code: number | null): void {
    this.code = code
    this.setStatus(getStatusByCode(code))
  }

  get success(): boolean {
    return this.status === 'success'
  }
  get loading(): boolean {
    return this.status === 'loading'
  }
  get error(): boolean {
    return this.status === 'error'
  }

  get notFound(): boolean {
    return this.code === StatusCodes.notFound
  }

  get longRegisterName(): boolean {
    return this.code === StatusCodes.longRegisterName
  }
  get sameRegisterName(): boolean {
    return this.code === StatusCodes.sameRegisterName
  }

  get wrongLoginName(): boolean {
    return this.code === StatusCodes.wrongLoginName
  }
  get wrongPassword(): boolean {
    return this.code === StatusCodes.wrongPassword
  }

  get notCardAuthor(): boolean {
    return this.code === StatusCodes.notCardAuthor
  }

  get sameCardName(): boolean {
    return this.code == StatusCodes.sameCardName
  }

  get unknownError(): boolean {
    return (
      notNull(this.code) && isErrorCode(this.code) && isUnknownError(this.code, this.handledErrors)
    )
  }
}
