import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CharacterDetails } from '../components/characters'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { movies, characters } from './mocks'
import axios from 'axios'

describe('CharacterDetails', () => {
    it('should render info lines properly', async () => {
        const mockUrl = 'https://people.url/people/123/'
        const mockGender = characters[0].gender
        const history = createMemoryHistory()

        jest.spyOn(axios, 'get')
            .mockResolvedValueOnce({ data: characters[0] })
        const { getByText } = 
            render(<Router history={history}>
            <CharacterDetails
                match={{ params: { filmID: 1 } }}
                filmURL={mockUrl}
                currentFavoriteCharsNames={[mockGender]}
                currentFavoriteChars={characters}
            />
            </Router>
        )
        await waitFor(() => {
            const nameNode = getByText(mockGender)
            expect(nameNode).toBeInTheDocument()
        }
        )
    }
    )
});

