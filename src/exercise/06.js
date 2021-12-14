// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

const FallbackComponent = ({error, resetErrorBoundary}) => (
  <div role="alert">
    There was an error:{' '}
    <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>try again</button>
  </div>
)

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    if (pokemonName) {
      const getPokemonData = async () => {
        setState({status: 'pending'})
        try {
          const response = await fetchPokemon(pokemonName)
          setState({status: 'resolved', pokemon: response})
        } catch (e) {
          setState({status: 'rejected', error: e})
        }
      }
      getPokemonData()
    }
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return <>'Submit a pokemon'</>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
    case 'rejected':
      throw state.error
    default:
      return null
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          resetKeys={[pokemonName]}
          FallbackComponent={FallbackComponent}
          onReset={() => setPokemonName(null)}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
