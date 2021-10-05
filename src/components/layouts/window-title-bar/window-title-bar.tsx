import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'preact/hooks'
import { useTabs } from '../../../providers/tab-provider'
import { TitledLink } from '../../navigation/titled-link'
import './window-title-bar.css'

export const WindowTitleBar = () => {
  const [maximized, setMaximized] = useState(false)
  const [maximizedClass, setMaximizedClass] = useState('')
  const [tabState, dispatchTabs] = useTabs()

  useEffect(() => {
    listen('tauri://resize', async () => {
      setMaximized(await appWindow.isMaximized())
    })
  }, [])

  useEffect(() => {
    setMaximizedClass(maximized ? '' : 'rounded-t-lg')
  }, [maximized])

  return (
    <header class={`text-white flex flex-col ${maximizedClass}`}>
      <section
        class={`flex space-x-1 bg-primary-800 p-1 pr-0 ${maximizedClass}`}
      >
        <nav class="-m-2">
          <ul class="flex p-2 space-x-2">
            {tabState.tabs.map((tab) => (
              <TitledLink to={tab.url} title={tab.title}>
                <li class={`tab ${tab.active ? 'active' : ''}`}>
                  <span>{tab.title}</span>
                  {tab.url != '/' ? (
                    <button
                      class="btn-close"
                      onClick={(e) => {
                        e.preventDefault()
                        dispatchTabs({ type: 'close', props: { url: tab.url } })
                      }}
                    >
                      ✕
                    </button>
                  ) : null}
                </li>
              </TitledLink>
            ))}
            <li class="rounded-md flex">
              <button
                class="icon"
                onClick={() => alert("C'est pas encore prêt")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        <div class="flex-grow" data-tauri-drag-region></div>
        <button class="windows-btn" onClick={() => appWindow.minimize()}>
          —
        </button>
        <button class="windows-btn" onClick={() => appWindow.toggleMaximize()}>
          ☐
        </button>
        <button
          class={`windows-btn close ${maximized ? '' : 'not-maximized'}`}
          onClick={() => appWindow.close()}
        >
          ✕
        </button>
      </section>
    </header>
  )
}
