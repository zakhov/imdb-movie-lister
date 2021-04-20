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
    plot,
    backdrop,
    title,
    rating,
    release_date,
    onClick,
}) => {
    return (
        <Box pad="medium" align="center">
            <Card elevation="large" width="medium" onClick={onClick}>
                <Box direction="row" justify="center" align="center" gap="none">
                    <CardHeader height="xxsmall">
                        <Heading level="4">
                            {title} ({getDate(release_date).year})
                        </Heading>
                    </CardHeader>
                </Box>
                <CardBody height="small">
                    <Image
                        fit="cover"
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
                        gap="small"
                        pad="medium"
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
    plot: string
    backdrop: any
    title: string
    rating: number | 0
    release_date: string
    onClick: any
}

export default MovieCard
