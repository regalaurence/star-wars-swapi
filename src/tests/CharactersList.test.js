import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CharactersList } from '../components/characters'
import { characters } from './mocks'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


describe('CharactersList', () => {
    it('should be a list of characters name', async () => {
        const history = createMemoryHistory()
        const { getByText } = render(<Router history={history}>
        <CharactersList
            match={{ params: { charID: 1 } }}
            charLoading={false}
            charError={false}
            characters={characters}
        />
        </Router>)
        const nameNode = getByText('Luke Skywalker')
        expect(nameNode).not.toBeUndefined()
    })
    it('should have as many elements as there are characters in the movie', async () => {
        const history = createMemoryHistory()
        const { getAllByText } =  render(<Router history={history}><CharactersList
            match={{ params: { charID: 1 } }}
            charLoading={false}
            charError={false}
            characters={characters}
        />
        </Router>)
        await waitFor(() => {
            const nameNode = getAllByText('Luke Skywalker')
            expect(nameNode.length).toEqual(characters.length)
        })
    }
    )
})

