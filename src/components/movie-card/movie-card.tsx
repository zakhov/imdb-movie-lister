import * as React from 'react'
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Heading,
} from 'grommet'
import { getDate, getImageURL } from 'helpers'

const MovieCard: React.FC<TMovieCardProps> = ({
    poster,
    // plot,
    // backdrop,
    title,
    rating,
    release_date,
    onClick,
}) => {
    return (
        <Box pad="medium" align="center" data-testid="movie-card">
            <Card elevation="large" width="medium" onClick={onClick}>
                <Box direction="row" justify="center" align="center" gap="none">
                    <CardHeader height="xxsmall">
                        <Heading level="4" data-testid="movie-card-title">
                            {title} ({getDate(release_date).year})
                        </Heading>
                    </CardHeader>
                </Box>
                <CardBody height="auto" background="black">
                    <Image
                        data-testid="movie-card-poster"
                        fit="contain"
                        src={
                            poster
                                ? getImageURL(poster, 500)
                                : 'https://place-hold.it/500x500'
                        }
                        a11yTitle="poster"
                    />
                </CardBody>
                <CardFooter>
                    <Box
                        direction="row"
                        justify="end"
                        align="center"
                        pad="medium"
                        data-testid="movie-card-popularity"
                    >
                        TVDB Popularity: {rating}
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    )
}

type TMovieCardProps = {
    poster: any
    plot?: string
    backdrop?: any
    title: string
    rating: number | 0
    release_date: string
    onClick?: any
}

export default MovieCard
