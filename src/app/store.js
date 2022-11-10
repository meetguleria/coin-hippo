import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../Services/cryptoAPI'

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
})