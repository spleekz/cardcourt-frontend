import { api, getCards } from '../api'
import { makeAutoObservable } from 'mobx'
import { PublicUserInfo } from '../../../backend/api/api-types'
import { ActionToUpdateCards } from './utility-types'
import { Cards, GetCardsParams, CardsResponse } from '../api/api'

interface User {
  info: {
    name: string
  }
  cards: {
    created: Cards
  }
}

export interface IUsersStore {
  user: User | null
  setUser(user: User): void

  loadUserInfo(name: string): Promise<PublicUserInfo>

  loadUserCards(name?: string): Promise<CardsResponse>
  setUserCards: ActionToUpdateCards
  pushUserCards: ActionToUpdateCards

  loadUser(name: string): Promise<void>
}

export class UsersStore implements IUsersStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  user: User | null = null
  setUser(user: User): void {
    this.user = user
  }

  loadUserInfo(name: string): Promise<PublicUserInfo> {
    return api.userInfo.getUserInfo(name).then((res) => {
      return res.data
    })
  }

  loadUserCards(name?: string): Promise<CardsResponse> {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: name || this.user?.info.name,
    }
    return getCards({ params })
  }
  setUserCards: ActionToUpdateCards = (cards) => {
    const prevCards = this.user!.cards.created
    prevCards.length = 0
    prevCards.push.apply(prevCards, cards)
  }
  pushUserCards: ActionToUpdateCards = (cards) => {
    this.user!.cards.created.push.apply(this.user!.cards!.created, cards)
  }

  //Одним экшеном грузим инфу и карточки
  async loadUser(name: string): Promise<void> {
    const info = await this.loadUserInfo(name)
    const loadCardsResponse = await this.loadUserCards(name)

    const user: User = { info, cards: { created: loadCardsResponse.cards } }

    this.setUser(user)
  }
}
