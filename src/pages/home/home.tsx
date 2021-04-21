import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { RouteComponentProps } from 'react-router-dom'
import { movieListEndPoint } from 'config'
import { Box, InfiniteScroll, Spinner } from 'grommet'
import MovieFilter from 'components/movie-filter'
import MovieCard from 'components/movie-card'
import MovieDetails from 'components/movie-details'
import Loading from 'components/loading'
import { sortMovies } from 'helpers'

const Home: React.FC<RouteComponentProps<{ movieId: string }>> = () => {
    const { useEffect, useState } = React

    const [sort_type, setSortType] = useState({
        value: 'release_date',
        text: 'Release date',
    })
    const [selected_movie, setSelectedMovie] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [movies_list, setMoviesList] = useState([])
    const [show_details, setShowDetails] = useState(false)
    const [is_loading, setIsLoading] = useState(true)
    const [is_fetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchDetails(pageNumber).then((movies: any) => {
            const sorted_movies = sortMovies(movies, sort_type.value)
            setMoviesList(sorted_movies)
            setIsLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSortUpdate = (sort_type_obj: any) => {
        setSortType(sort_type_obj)
        const sorted_movies = sortMovies(movies_list, sort_type_obj.value)
        setMoviesList(sorted_movies)
    }

    const fetchDetails = async (pageNumber: number): Promise<void> => {
        const response = await fetch(movieListEndPoint(pageNumber))
        const list = await response.json()
        return list.results
    }

    const handleRefresh = (): Promise<void> =>
        new Promise((res) => {
            setPageNumber(1)
            setMoviesList([])
            // fetch new data
            setIsLoading(true)
            fetchDetails(1).then((movies: any) => {
                const sorted_movies = sortMovies(movies, sort_type.value)
                setMoviesList(sorted_movies)
                setTimeout(() => {
                    res(setIsLoading(false))
                }, 1500)
            })
        })

    const handleFetchMore = (): Promise<void> =>
        new Promise((res) => {
            const pageCount = pageNumber + 1
            setPageNumber(pageCount)
            // fetch more data from API for movies, page: 1++...
            setIsFetching(true)
            fetchDetails(pageCount).then((movies: any) => {
                const merged_movies: any = [...movies_list, ...movies]
                setMoviesList(merged_movies)
                setTimeout(() => {
                    res(setIsFetching(false))
                }, 1500)
            })
        })

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault()
        setSelectedMovie(id)
        setShowDetails(true)
    }

    return (
        <React.Fragment>
            <MovieFilter
                value={sort_type.value}
                text={sort_type.text}
                onChange={onSortUpdate}
            />
            <PullToRefresh
                onRefresh={handleRefresh}
                pullDownThreshold={90}
                onFetchMore={handleFetchMore}
                canFetchMore
            >
                {is_loading || movies_list.length < 1 ? (
                    <Loading />
                ) : (
                    <React.Fragment>
                        <Box fill overflow="auto">
                            <InfiniteScroll
                                items={movies_list.filter(
                                    (movie: any) => !!movie.title
                                )}
                                step={4}
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
                        </Box>
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
                    is_page={false}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </React.Fragment>
    )
}

export default Home
