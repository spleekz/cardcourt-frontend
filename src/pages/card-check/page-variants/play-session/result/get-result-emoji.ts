import { getRandomArrayElement } from 'utils/arrays'

import { ResultStatus } from './get-result-status'

export const getResultEmoji = (resultStatus: ResultStatus): string => {
  const failEmoji = ['đ¤Ą', 'đĨ', 'đ­']
  const badEmoji = ['âšī¸', 'đ§', 'đ']
  const normalEmoji = ['đ', 'đļ', 'đ']
  const goodEmoji = ['đ', 'đ', 'đ']
  const excellentEmoji = ['đ¤Š', 'đ¤', 'đ']
  const winEmoji = ['đ', 'đĨŗ', 'đ']

  const currentEmojiArray =
    resultStatus === 'fail'
      ? failEmoji
      : resultStatus === 'bad'
      ? badEmoji
      : resultStatus === 'normal'
      ? normalEmoji
      : resultStatus === 'good'
      ? goodEmoji
      : resultStatus === 'excellent'
      ? excellentEmoji
      : winEmoji

  return getRandomArrayElement(currentEmojiArray)
}
