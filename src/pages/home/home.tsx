import * as React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { RouteComponentProps } from 'react-router-dom'
import { MOVIE_DATA } from '../../constants/mock-data'
import MovieCard from '../../components/movie-card/'
import { sortMovies } from '../../helpers/tmdb'

const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { useEffect, useState } = React
    const { results } = MOVIE_DATA

    const [sortKey, setSortKey] = useState('release_date')
    const [movies, setMovies] = useState(results)

    useEffect(() => {
        if (movies?.length > 1) {
            setMovies(sortMovies(movies, sortKey))
        }
        console.log(history, location)
        console.log(sortMovies(results, sortKey))
        console.log('mounted home')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        sortMovies(movies, sortKey)
    }, [movies, sortKey])

    const handleRefresh = (): Promise<void> =>
        new Promise((res) => {
            setTimeout(() => {
                res(console.log('done refresh'))
            }, 1500)
        })

    const handleFetchMore = (): Promise<void> =>
        new Promise((res) => {
            setTimeout(() => {
                res(console.log('done fetching'))
            }, 1500)
        })

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault()
        console.log('click', id)
    }

    return (
        <PullToRefresh
            onRefresh={handleRefresh}
            canFetchMore={true}
            onFetchMore={handleFetchMore}
        >
            <React.Fragment>
                {movies.map((item: any, index: number) => (
                    <MovieCard
                        key={index}
                        title={item.title}
                        backdrop={item.backdrop_path}
                        release_date={item.release_date}
                        poster={item.poster_path}
                        plot={item.overview}
                        rating={item.popularity}
                        onClick={(event: React.MouseEvent<HTMLElement>) =>
                            handleClick(event, item.id)
                        }
                    />
                ))}
            </React.Fragment>
        </PullToRefresh>
    )
}

export default Home
