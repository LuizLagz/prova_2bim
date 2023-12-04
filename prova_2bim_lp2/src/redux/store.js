import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer';
import msgSlice from './mensagemReducer';

const store = configureStore({
    reducer:{
        usuarioSlice: usuarioSlice,
        msg: msgSlice,
    }
});

export default store;