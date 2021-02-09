import { useState } from 'react'
import { useSetSoundState } from 'components/AppSettings'

export type SwitcherStateType = {
  phonetic: boolean
  wordVisible: boolean
  sound: boolean
  darkMode: boolean
}

export type SwitcherDispatchType = (type: string, newStatus?: boolean) => void

const useSwitcherState = (initialState: {
  phonetic: boolean
  wordVisible: boolean
  darkMode?: boolean
}): [SwitcherStateType, SwitcherDispatchType] => {
  const [phonetic, setPhonetic] = useState(initialState.phonetic)
  const [wordVisible, setWordVisible] = useState(initialState.wordVisible)
  const [sound, setSound] = useSetSoundState()
  const [darkMode, setDarkMode] = useState(
    initialState.darkMode ??
      (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)),
  )

  const dispatch: SwitcherDispatchType = (type, newStatus) => {
    switch (type) {
      case 'phonetic':
        newStatus === undefined ? setPhonetic(!phonetic) : setPhonetic(newStatus)
        break
      case 'wordVisible':
        newStatus === undefined ? setWordVisible(!wordVisible) : setWordVisible(newStatus)
        break
      case 'sound':
        newStatus === undefined ? setSound(!sound) : setSound(newStatus)
        break
      case 'darkMode':
        const newDarkMode = newStatus ?? !darkMode
        setDarkMode(newDarkMode)
        if (newDarkMode) {
          localStorage.theme = 'dark'
          document.documentElement.classList.add('dark')
        } else {
          localStorage.theme = 'light'
          document.documentElement.classList.remove('dark')
        }
        break
    }
  }

  return [{ phonetic, wordVisible, sound, darkMode }, dispatch]
}

export default useSwitcherState
