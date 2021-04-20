import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { RouteComponentProps } from 'react-router-dom'
import { MOVIE_DATA, FILTER_TYPES } from '../../constants'
import MovieCard from '../../components/movie-card'
import MovieFilter from '../../components/movie-filter'
import { sortMovies } from '../../helpers/tmdb'

const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { useEffect, useState } = React
    const { results } = MOVIE_DATA

    const [sortKey, setSortKey] = useState(FILTER_TYPES[0])
    const [is_loading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState({})

    useEffect(() => {
        console.log('mounted home')
        if (results.length) {
            setMovies(results)
            setIsLoading(false)
        }
        // fetch API here if fresh state
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRefresh = (): Promise<void> =>
        new Promise((res) => {
            // clear movies in store and fetch again from API
            setTimeout(() => {
                res(console.log('done refresh'))
            }, 1500)
        })

    const handleFetchMore = (): Promise<void> =>
        new Promise((res) => {
            // fetch more data from API for movies, page: 1++...
            setTimeout(() => {
                res(console.log('done fetching'))
            }, 1500)
        })

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault()
        console.log('click', id)
    }

    return (
        <div>
            <MovieFilter
                value={sortKey.value}
                text={sortKey.text}
                onChange={setSortKey}
            />
            <PullToRefresh
                onRefresh={handleRefresh}
                canFetchMore={true}
                onFetchMore={handleFetchMore}
            >
                {is_loading ? (
                    <div>content is loading..</div>
                ) : (
                    <React.Fragment>
                        {sortMovies(movies, sortKey.value).map(
                            (item: any, index: number) => (
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
                            )
                        )}
                    </React.Fragment>
                )}
            </PullToRefresh>
        </div>
    )
}

export default Home
