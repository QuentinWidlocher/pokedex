import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'preact/hooks'
import { useTabs } from '../../../providers/tab-provider'
import { TitledLink } from '../../navigation/titled-link'
import { Plus, Minus, Cancel, Square } from 'iconoir-react'
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
    <header class={`text-white flex flex-col select-none ${maximizedClass}`}>
      <section
        class={`flex space-x-1 bg-primary-800 p-1 pr-0 ${maximizedClass}`}
      >
        <nav class="-m-2 overflow-x-auto">
          <ul class="flex flex-shrink p-2 space-x-2">
            {tabState.tabs.map((tab) => (
              <TitledLink to={tab.url} title={tab.title}>
                <li class={`tab ${tab.active ? 'active' : ''}`}>
                  {tab.icon ? <div class="mr-2 ">{tab.icon}</div> : null}
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
          </ul>
        </nav>
        <div class="flex-grow flex" data-tauri-drag-region>
          <button
            class="icon ml-3 my-auto"
            onClick={() => alert("C'est pas encore prêt")}
          >
            <Plus />
          </button>
        </div>
        <button class="windows-btn" onClick={() => appWindow.minimize()}>
          <Minus height={16} width={16} />
        </button>
        <button class="windows-btn" onClick={() => appWindow.toggleMaximize()}>
          <Square height={12} width={12} />
        </button>
        <button
          class={`windows-btn close ${maximized ? '' : 'not-maximized'}`}
          onClick={() => appWindow.close()}
        >
          <Cancel height={16} width={16} />
        </button>
      </section>
    </header>
  )
}
