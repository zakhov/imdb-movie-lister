import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { RouteComponentProps } from 'react-router-dom'
import { MOVIE_DATA, FILTER_TYPES } from 'config'
import { Box, InfiniteScroll, Spinner } from 'grommet'
import MovieFilter from 'components/movie-filter'
import MovieCard from 'components/movie-card'
import MovieDetails from 'components/movie-details'
import { sortMovies } from 'helpers'

const Home: React.FC<RouteComponentProps<{ movieId: string }>> = ({
    match,
}) => {
    const { useEffect, useState } = React
    const { results } = MOVIE_DATA
    const { movieId } = match.params

    const [sort_type, setSortType] = useState(FILTER_TYPES[0])
    const [is_loading, setIsLoading] = useState(true)
    const [is_fetching, setIsFetching] = useState(false)
    const [movies, setMovies] = useState({})
    const [selected_movie, setSelectedMovie] = useState(movieId)
    const [show_details, setShowDetails] = useState(false)

    useEffect(() => {
        console.log('mounted home')
        if (results.length) {
            setMovies(results)
            setIsLoading(false)
        }

        if (movieId) {
            console.log(movieId)
        }
        // fetch API here if fresh state
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRefresh = (): Promise<void> =>
        new Promise((res) => {
            setIsLoading(true)
            // clear movies in store and fetch again from API
            setTimeout(() => {
                res(console.log('done refresh'))
                setIsLoading(false)
            }, 1500)
        })

    const handleFetchMore = (): Promise<void> =>
        new Promise((res) => {
            setIsFetching(true)
            // fetch more data from API for movies, page: 1++...
            setTimeout(() => {
                setIsFetching(false)
                res(console.log('done fetching'))
            }, 3500)
        })

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault()
        setSelectedMovie(id)
        setShowDetails(true)
    }

    return (
        <div>
            <MovieFilter
                value={sort_type.value}
                text={sort_type.text}
                onChange={setSortType}
            />
            <PullToRefresh onRefresh={handleRefresh} pullDownThreshold={90}>
                {is_loading ? (
                    <div>content is loading..</div>
                ) : (
                    <React.Fragment>
                        <div style={{ overflowY: 'auto' }}>
                            <InfiniteScroll
                                items={sortMovies(movies, sort_type.value)}
                                step={4}
                                onMore={handleFetchMore}
                            >
                                {(item: any, index: number) => (
                                    <MovieCard
                                        key={index}
                                        title={item.title}
                                        backdrop={item.backdrop_path}
                                        release_date={item.release_date}
                                        poster={item.poster_path}
                                        plot={item.overview}
                                        rating={item.popularity}
                                        onClick={(
                                            event: React.MouseEvent<HTMLElement>
                                        ) => handleClick(event, item.id)}
                                    />
                                )}
                            </InfiniteScroll>
                        </div>
                        {is_fetching && (
                            <Box align="center" gap="small">
                                <Spinner size="large" />
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </PullToRefresh>
            {show_details && (
                <MovieDetails
                    id={selected_movie}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    )
}

export default Home
