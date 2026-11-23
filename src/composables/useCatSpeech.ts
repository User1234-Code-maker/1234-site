import { onBeforeUnmount, ref } from 'vue'
import { catPhrases, type CatMood } from '../data/cat'

// «Речь» котика: пузырь с фразой, крик, пока его несут, и редкая болтовня сама по себе.
// Все таймеры живут здесь и сами очищаются при размонтировании компонента.
export function useCatSpeech(t: (key: string) => string) {
  const said = ref('')
  let sayTimer = 0
  let screamTimer = 0
  let chatTimer = 0

  const phrase = (mood: CatMood) => {
    const list = catPhrases[mood]
    return t(list[Math.floor(Math.random() * list.length)]!)
  }

  function sayFor(text: string, ms: number) {
    said.value = text
    window.clearTimeout(sayTimer)
    sayTimer = window.setTimeout(() => (said.value = ''), ms)
  }
  const sayMood = (mood: CatMood, ms: number) => sayFor(phrase(mood), ms)

  // фраза «ааа» меняется раз в ~0,7 с, пока котика несут
  function startScream() {
    window.clearTimeout(sayTimer)
    said.value = phrase('scream')
    screamTimer = window.setTimeout(startScream, 700)
  }
  const stopScream = () => window.clearTimeout(screamTimer)

  // раз в 22–50 с что-нибудь бормочет; canChat решает, уместно ли сейчас (не спит, не несут и т. п.)
  function startChatter(canChat: () => boolean, isMusicOn: () => boolean) {
    window.clearTimeout(chatTimer)
    chatTimer = window.setTimeout(
      () => {
        if (!said.value && !document.hidden && canChat()) {
          sayMood(isMusicOn() && Math.random() < 0.6 ? 'music' : 'idle', 3600)
        }
        startChatter(canChat, isMusicOn)
      },
      22000 + Math.random() * 28000,
    )
  }

  const hush = () => {
    window.clearTimeout(sayTimer)
    said.value = ''
  }

  onBeforeUnmount(() => {
    window.clearTimeout(sayTimer)
    window.clearTimeout(screamTimer)
    window.clearTimeout(chatTimer)
  })

  return { said, sayMood, startScream, stopScream, startChatter, hush }
}
