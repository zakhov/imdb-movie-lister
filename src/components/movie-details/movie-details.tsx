import * as React from 'react'
import ReactDOM from 'react-dom'
import { Button, Layer } from 'grommet'

const MovieDetails: React.FC<TMovieDetailsProps> = ({ id, onClose }) => {
    const modal_root = document.getElementById('modal-root') as HTMLElement
    return ReactDOM.createPortal(
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
            {id}
            <Button onClick={onClose}>Close</Button>
        </Layer>,
        modal_root
    )
}

type TMovieDetailsProps = {
    id: string
    onClose: any
}

export default MovieDetails
