import { createContext, FunctionComponent } from 'preact'
import { useContext, useEffect, useReducer } from 'preact/hooks'

type Tab = {
  title: string
  url: string
  active?: boolean
}
type Action =
  | { type: 'add'; props: Tab }
  | { type: 'select'; props: { url: string } }
  | { type: 'linkClick'; props: { url: string; title: string } }
  | { type: 'close'; props: { url: string } }
type Dispatch = (action: Action) => void
type TabState = { tabs: Tab[] }

const TabContext = createContext<
  { state: TabState; dispatch: Dispatch } | undefined
>(undefined)

function tabReducer({ tabs }: TabState, action: Action): TabState {
  switch (action.type) {
    case 'add': {
      return {
        tabs: [
          ...tabs.map((tab) => ({ ...tab, active: false })),
          { ...action.props, active: true },
        ],
      }
    }
    case 'select': {
      // Return every tabs with active:false except if the url is found among the tabs
      return {
        tabs: tabs.map((tab) =>
          tab.url == action.props.url
            ? { ...tab, active: true }
            : { ...tab, active: false },
        ),
      }
    }
    case 'linkClick': {
      if (tabs.some((tab) => tab.url == action.props.url)) {
        // If the url is found among the tabs, select it
        return tabReducer(
          { tabs },
          { type: 'select', props: { url: action.props.url } },
        )
      } else {
        // If the tab is not yet opened, add it to the list
        return tabReducer(
          { tabs },
          {
            type: 'add',
            props: {
              title: action.props.title,
              url: action.props.url,
            },
          },
        )
      }
    }
    case 'close': {
      console.log(action.props.url)

      return tabReducer(
        { tabs: tabs.filter((tab) => tab.url != action.props.url) },
        { type: 'select', props: { url: '/' } },
      )
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const TabProvider: FunctionComponent<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(tabReducer, { tabs: [] })

  const value = { state, dispatch }

  useEffect(function onInit() {
    dispatch({ type: 'add', props: { title: 'Search', url: '/' } })
  }, [])

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

export function useTabs(): [TabState, Dispatch] {
  const context = useContext(TabContext)

  if (!context) {
    throw new Error('useTabs must be used within a TabProvider')
  }

  return [context.state, context.dispatch]
}
