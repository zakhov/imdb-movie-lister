import * as React from 'react'
import { Filter } from 'grommet-icons'
import { FILTER_TYPES } from '../../constants'

const MovieFilter: React.FC<TMovieFilterProps> = ({
    text,
    value,
    onChange,
}) => {
    const [selected, setSelected] = React.useState<String>(text)
    const select_ref = React.useRef<HTMLSelectElement>(null)
    const options = FILTER_TYPES

    const onFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        const synthetic_event = new MouseEvent('mousedown')
        select_ref.current?.dispatchEvent(synthetic_event)
    }

    return (
        <div className="movies-filter">
            <div onClick={onFilterClick} className="movies-filter__display">
                <Filter
                    size="large"
                    className={`movies-filter-icon--${selected}`}
                />
            </div>
            <select
                ref={select_ref}
                id="select_movies_filter"
                name="movies_filter"
                className="movies-filter__select"
                placeholder="Select a movie filter"
                value={value}
                onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                    const { selectedIndex, value } = event.currentTarget
                    const display_text = options[selectedIndex].text
                    onChange({ value, text: display_text })
                    setSelected(display_text)
                }}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

type TMovieFilterProps = {
    value: string
    text: string
    onChange: Function
}

export default MovieFilter
