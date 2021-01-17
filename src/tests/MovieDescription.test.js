import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MovieDescription } from '../components/movies'

describe('MovieDescription', () => {

    it('should render descrption properly', async () => {
        const mockOpeningCrawl = "It is a period of civil war."
        const { getByText } = render(<MovieDescription
            opening_crawl={mockOpeningCrawl}
        />)
        await waitFor(() => {
            const crawlNode = getByText(mockOpeningCrawl)
            expect(crawlNode).toBeInTheDocument()
        }
        )
    }
    )
});

