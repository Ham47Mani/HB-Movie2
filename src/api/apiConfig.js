const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'c09799f64be37772ad15596939b1eda0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`
}

export default apiConfig;