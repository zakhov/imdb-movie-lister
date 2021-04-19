export const getImageURL = (filename: string, size: number) => {
    if (size) {
        return `https://image.tmdb.org/t/p/w${size}/${filename}`
    }
    return `https://image.tmdb.org/t/p/original/${filename}`
}

export const getDate = (date: string) =>
    (([year, day, month]) => ({ day, month, year }))(date.split('-'))
