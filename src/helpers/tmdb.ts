import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

export const getImageURL = (
    filename: string,
    size?: number | boolean,
    image_type?: string
) => {
    if (size) {
        return `https://image.tmdb.org/t/p/w${size}/${filename}`
    }
    return `https://image.tmdb.org/t/p/original/${filename}`
}

export const getDate = (date: string) => {
    const formatted_date = dayjs(date, 'YYYY-MM-DD')
    return {
        year: formatted_date.get('y'),
        month: formatted_date.get('M'),
        day: formatted_date.get('d'),
        epoch: formatted_date.unix(),
    }
}

export const getMovieDuration = (runtime: number) => {
    dayjs.extend(duration)
    const time = dayjs.duration(runtime, 'minutes')
    const hours = time.hours()
    const minutes = time.minutes()

    return `${hours} ${hours > 1 ? 'Hours' : 'Hour'} ${minutes} ${
        minutes > 1 ? 'Minutes' : 'Minute'
    }`
}

export const sortMovies = (
    moviesObj: any,
    sort_type: string,
    is_descending: boolean = true
) => {
    const parseValue = (value: any, value_type: string) => {
        if (value_type === 'release_date') {
            return getDate(value).epoch
        }
        return value
    }
    const sortArray = moviesObj.sort((a: any, b: any) => {
        const value_a = parseValue(a[sort_type], sort_type)
        const value_b = parseValue(b[sort_type], sort_type)
        if (is_descending && sort_type !== 'title') {
            if (value_a < value_b) return 1
            else if (value_b < value_a) return -1
        } else {
            if (value_a > value_b) return 1
            else if (value_b > value_a) return -1
        }
        return 0
    })
    return sortArray
}
