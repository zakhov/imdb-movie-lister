import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import MovieDetails from 'components/movie-details'

const Movie: React.FC<RouteComponentProps<{ movieId: string }>> = ({
    match,
    history,
}) => {
    const { movieId } = match.params

    const goBackToHome = () => {
        history.push('home')
    }

    return <MovieDetails id={movieId} is_page onClose={() => goBackToHome()} />
}

export default Movie
