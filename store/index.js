import { configureStore } from "@reduxjs/toolkit";

// bu dosya store'ları configure etmek için

import reducers from './reducers';

const store = configureStore({
    reducer: {
        comment : reducers
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store;