import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Articles from '../../pages/articles';
import { fetchTopHeadlines } from '../../api/articlesApi';
import '@testing-library/jest-dom';

jest.mock('../../api/articlesApi');
const mockedFetchTopHeadlines = fetchTopHeadlines as jest.MockedFunction<typeof fetchTopHeadlines>;

const queryClient = new QueryClient();

const mockData = [
  {
    title: 'Article 1',
    description: 'Description 1',
    url: 'http://example.com/1',
    urlToImage: 'http://example.com/image1.jpg',
  },
  {
    title: 'Article 2',
    description: 'Description 2',
    url: 'http://example.com/2',
    urlToImage: 'http://example.com/image2.jpg',
  },
];

describe('Articles Component', () => {
  beforeEach(() => {
    mockedFetchTopHeadlines.mockReturnValue({
      data: mockData,
      isLoading: false,
      refetch: jest.fn(),
    } as any);
  });

  test('renders articles and handles pagination', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/articles/general']}>
          <Routes>
            <Route path="/articles/:category" element={<Articles />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
    });

    const showMoreButton = screen.getByText(/Show More/i);
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);

    await waitFor(() => {
      expect(mockedFetchTopHeadlines).toHaveBeenCalledTimes(2);
    });
  });
});
