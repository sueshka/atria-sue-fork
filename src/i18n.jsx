import { createContext, useContext, useEffect, useState } from 'react'
import { ru } from './content.js'
import { kg } from './content.kg.js'

const DATA = { ru, kg }
const LangCtx = createContext({ lang: 'ru', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('atria-lang') || 'ru'
    } catch {
      return 'ru'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('atria-lang', lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}

export function useContent() {
  const { lang } = useContext(LangCtx)
  return DATA[lang] || ru
}
