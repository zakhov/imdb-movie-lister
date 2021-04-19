import * as React from 'react'
import { MOVIE_DATA } from '../../constants/mock-data'
import MovieCard from '../../components/movie-card/movie-card'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { RouteComponentProps } from 'react-router-dom'

const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { useEffect } = React
    const { results } = MOVIE_DATA

    useEffect(() => {
        console.log(history, location)
        console.log(MOVIE_DATA.results)
        console.log('mounted home')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const handleClick: any = (
        event: React.MouseEvent<HTMLElement>,
        id: string
    ) => {
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
                {results.map((item: any, index: number) => (
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
