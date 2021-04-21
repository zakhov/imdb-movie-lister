import * as React from 'react'
import ReactDOM from 'react-dom'
import Div100vh from 'react-div-100vh'
import {
    Button,
    Box,
    CardBody,
    CardHeader,
    CardFooter,
    Grid,
    Heading,
    Image,
    Layer,
    Text,
} from 'grommet'
import { Close, ShareOption } from 'grommet-icons'
import { movieDetailsEndPoint, movieBookingLink } from 'config'
import { getMovieDuration, getDate, getImageURL } from 'helpers'
import Loading from 'components/loading'

const MovieDetails: React.FC<TMovieDetailsProps> = ({
    id,
    is_page,
    onClose,
}) => {
    const modal_root = document.getElementById('modal-root') as HTMLElement

    const { useEffect, useState } = React

    const [states, setStates] = useState({ details: {}, is_loading: true })

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(movieDetailsEndPoint(id))
            const details = await response.json()
            setStates({ is_loading: false, details })
        }

        fetchDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const {
        overview,
        poster_path,
        // backdrop_path,
        genres,
        spoken_languages,
        runtime,
        release_date,
        title,
    } = states.details as TMovieDataDetails

    const bookMovie = (event: React.MouseEvent<HTMLElement>) =>
        window.open(movieBookingLink, '__blank')

    const movieDetailsContent = (
        <React.Fragment>
            {states.is_loading ? (
                <Loading />
            ) : (
                <Div100vh>
                    <Box fill pad={{ vertical: 'small', horizontal: 'medium' }}>
                        <Box
                            direction="row"
                            justify={is_page ? 'center' : 'between'}
                            align="center"
                            gap="none"
                        >
                            <CardHeader height="xxsmall" alignSelf="center">
                                <Heading level="4">
                                    {title} ({getDate(release_date).year})
                                </Heading>
                            </CardHeader>
                            <Close
                                cursor="pointer"
                                color="brand"
                                size="medium"
                                onClick={onClose}
                            />
                        </Box>
                        <CardBody>
                            <Image
                                fit="contain"
                                src={
                                    poster_path
                                        ? getImageURL(poster_path, false)
                                        : 'https://place-hold.it/500x500'
                                }
                                a11yTitle="poster"
                            />
                            <Grid
                                columns={{
                                    count: 3,
                                    size: 'auto',
                                }}
                                gap="small"
                                pad="small"
                                style={{
                                    justifyItems: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Box
                                    justify="center"
                                    align="start"
                                    gap="small"
                                    pad="small"
                                >
                                    <Heading level="4">Genres</Heading>
                                    {genres.length > 0 ? (
                                        genres.map(
                                            (genre: any, index: number) => (
                                                <Text size="xsmall" key={index}>
                                                    {genre.name}
                                                </Text>
                                            )
                                        )
                                    ) : (
                                        <Text size="xsmall">
                                            Genres info not available
                                        </Text>
                                    )}
                                </Box>
                                <Box
                                    justify="center"
                                    align="start"
                                    gap="small"
                                    pad="small"
                                >
                                    <Heading level="4">Languages</Heading>
                                    {spoken_languages.length > 0 ? (
                                        spoken_languages.map(
                                            (lang: any, index: number) => (
                                                <Text size="xsmall" key={index}>
                                                    {lang.english_name}
                                                </Text>
                                            )
                                        )
                                    ) : (
                                        <Text size="xsmall">
                                            Language info not available
                                        </Text>
                                    )}
                                </Box>
                                <Box
                                    justify="center"
                                    align="start"
                                    pad="small"
                                    gap="small"
                                >
                                    <Heading level="4">Duration</Heading>
                                    {runtime > 0 ? (
                                        <Text size="small">
                                            {getMovieDuration(runtime)}
                                        </Text>
                                    ) : (
                                        <Text size="xsmall">
                                            Duration info not available
                                        </Text>
                                    )}
                                </Box>
                            </Grid>
                            <Box
                                direction="row-responsive"
                                justify="center"
                                pad="small"
                            >
                                <Text size="small">
                                    {overview.length > 2
                                        ? overview
                                        : 'No synopsis available'}
                                </Text>
                            </Box>
                        </CardBody>
                        <CardFooter style={{ marginTop: 'auto' }}>
                            <Box
                                fill
                                direction="row"
                                justify="center"
                                align="center"
                                pad="small"
                            >
                                <Button
                                    primary
                                    label="Book Movie"
                                    icon={<ShareOption size="medium" />}
                                    onClick={bookMovie}
                                />
                            </Box>
                        </CardFooter>
                    </Box>
                </Div100vh>
            )}
        </React.Fragment>
    )

    if (is_page) {
        return movieDetailsContent
    }

    return ReactDOM.createPortal(
        <Layer
            animation="slide"
            full
            position="center"
            onClickOutside={onClose}
            onEsc={onClose}
        >
            {movieDetailsContent}
        </Layer>,
        modal_root
    )
}

type TMovieDetailsProps = {
    id: string
    is_page: boolean
    onClose: any
}

type TMovieDataDetails = {
    poster_path: string
    backdrop_path: string
    overview: string
    genres: string[]
    spoken_languages: string[]
    runtime: number
    release_date: string
    title: string
}

export default MovieDetails
