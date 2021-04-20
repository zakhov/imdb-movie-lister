import dayjs from 'dayjs'

export const getImageURL = (filename: string, size: number) => {
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

export const sortMovies = (
    moviesObj: any,
    sortKey: string,
    is_descending: boolean = true
) => {
    console.log('sorting', sortKey)
    const parseValue = (value: any, value_type: string) => {
        if (value_type === 'release_date') {
            return getDate(value).epoch
        }
        return value
    }
    const sortArray = moviesObj.sort((a: any, b: any) => {
        const value_a = parseValue(a[sortKey], sortKey)
        const value_b = parseValue(b[sortKey], sortKey)
        if (is_descending && sortKey !== 'title') {
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
