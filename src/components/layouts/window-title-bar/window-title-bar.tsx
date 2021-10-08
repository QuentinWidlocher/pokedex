import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'preact/hooks'
import { Tab, useTabs } from '../../../providers/tab-provider'
import { TitledLink } from '../../navigation/titled-link'
import { Download, Minus, Cancel, Square } from 'iconoir-react'
import { useHistory } from 'react-router-dom'
import { downloadAllData } from '../../../services/api'
import { Tooltip } from '@mantine/core'
import './window-title-bar.css'

export const WindowTitleBar = ({
  onLockUI,
}: {
  onLockUI: (state: boolean) => void
}) => {
  const [maximized, setMaximized] = useState(false)
  const [maximizedClass, setMaximizedClass] = useState('')
  const [tabState, dispatchTabs] = useTabs()
  const history = useHistory()

  useEffect(() => {
    listen('tauri://resize', async () => {
      setMaximized(await appWindow.isMaximized())
    })
  }, [])

  useEffect(() => {
    setMaximizedClass(maximized ? '' : 'rounded-t-lg')
  }, [maximized])

  function onTabClose(event: Event, tab: Tab) {
    event.preventDefault()
    event.stopPropagation()
    dispatchTabs({ type: 'close', props: { url: tab.url } })
    history.push('/')
  }

  function downloadAll() {
    onLockUI(true)
    downloadAllData().then(() => {
      onLockUI(false)
      alert(
        "All the data has been downloaded !\nYou can now use this application without being online\nBonus: it's faster now ;)",
      )
    })
  }

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
                      onClick={(e) => onTabClose(e, tab)}
                    >
                      <Cancel height={16} width={16} />
                    </button>
                  ) : null}
                </li>
              </TitledLink>
            ))}
          </ul>
        </nav>
        <div class="flex-grow flex justify-end" data-tauri-drag-region>
          {!localStorage.getItem('allDataDownloaded') ? (
            <Tooltip class="my-auto" label="Download all data" withArrow>
              <button
                class="icon ml-3 my-auto"
                onClick={() => {
                  downloadAll()
                }}
              >
                <Download />
              </button>
            </Tooltip>
          ) : null}
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
