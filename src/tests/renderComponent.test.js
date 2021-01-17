import '@testing-library/jest-dom/extend-expect'
import { renderComponent } from '../util'


describe('renderComponent', () => {

    it('should return a component if not loading or not error', () => {
        const mockLoadingStatus = false
        const mockErrorStatus = false
        const mockComponent = 'hello'
        const mockReturn = renderComponent(mockLoadingStatus, mockErrorStatus, mockComponent)
        expect(mockReturn).toBe('hello')
    })
})