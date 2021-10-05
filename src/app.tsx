import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { WindowTitleBar } from './components/layouts/window-title-bar/window-title-bar'
import { PokemonDetailRoute } from './features/pokemon-detail/routes/pokemon-detail'
import { PokemonListRoute } from './features/pokemon-list/routes/pokemon-list'
import { MantineProvider } from '@mantine/core'
import './app.css'
import { TabProvider } from './providers/tab-provider'

export function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'red',
      }}
    >
      <Router>
        <TabProvider>
          <div className="grid-wrapper">
            <header className="grid-titlebar">
              <WindowTitleBar />
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
        </TabProvider>
      </Router>
    </MantineProvider>
  )
}
