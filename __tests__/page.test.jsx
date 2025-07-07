import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { AppRouterContextProviderMock } from './app-router-context-provider-mock';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

 
describe('Page', () => {
  it('renders a heading', () => {
    render(<AppRouterContextProviderMock router={{ push }}><Page /></AppRouterContextProviderMock>);
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})