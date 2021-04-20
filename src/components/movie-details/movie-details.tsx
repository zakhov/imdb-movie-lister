import * as React from 'react'
import { Button, Layer } from 'grommet'

const MovieDetails: React.FC<TMovieDetailsProps> = ({ id, onClose }) => {
    return (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
            {id}
            <Button onClick={onClose}>Close</Button>
        </Layer>
    )
}

type TMovieDetailsProps = {
    id: string
    onClose: any
}

export default MovieDetails
