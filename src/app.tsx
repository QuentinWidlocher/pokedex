import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { WindowTitleBar } from './components/layouts/window-title-bar/window-title-bar'
import { PokemonDetailRoute } from './features/pokemon-detail/routes/pokemon-detail'
import { PokemonListRoute } from './features/pokemon-list/routes/pokemon-list'
import { MantineProvider } from '@mantine/core'
import './app.css'

export function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'red',
      }}
    >
      <div className="grid-wrapper">
        <header className="grid-titlebar">
          <WindowTitleBar />
        </header>
        <main className="grid-main p-10">
          <Router>
            <Switch>
              <Route exact path="/">
                <PokemonListRoute />
              </Route>
              <Route path="/:id">
                <PokemonDetailRoute />
              </Route>
            </Switch>
          </Router>
        </main>
        <footer className="grid-footer"></footer>
      </div>
    </MantineProvider>
  )
}
