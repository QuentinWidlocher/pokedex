import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { WindowTitleBar } from './components/layouts/window-title-bar/window-title-bar'
import { PokemonDetailRoute } from './features/pokemon-detail/routes/pokemon-detail'
import { PokemonListRoute } from './features/pokemon-list/routes/pokemon-list'
import { MantineProvider, LoadingOverlay } from '@mantine/core'
import './app.css'
import { TabProvider } from './providers/tab-provider'
import { useState } from 'preact/hooks'

export function App() {
  const [loading, setLoading] = useState(false)

  return (
    <MantineProvider
      theme={{
        primaryColor: 'red',
      }}
    >
      <Router>
        <TabProvider>
          <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} />
            <div className="grid-wrapper">
              <header className="grid-titlebar">
                <WindowTitleBar onLockUI={setLoading} />
              </header>
              <main className="grid-main p-10">
                <Switch>
                  <Route exact path="/">
                    <PokemonListRoute />
                  </Route>
                  <Route path="/:id">
                    <PokemonDetailRoute />
                  </Route>
                </Switch>
              </main>
              <footer className="grid-footer"></footer>
            </div>
          </div>
        </TabProvider>
      </Router>
    </MantineProvider>
  )
}
