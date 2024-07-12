import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostrarCartel: false,
  tipoAccion: '',
};

const notificacionSlice = createSlice({
  name: 'notificacion',
  initialState,
  reducers: {
    mostrarCartel: (state, action) => {
      state.mostrarCartel = true;
      state.tipoAccion = action.payload.tipoAccion;
    },
    ocultarCartel: (state) => {
      state.mostrarCartel = false;
      state.tipoAccion = '';
    },
  },
});

export const { mostrarCartel, ocultarCartel } = notificacionSlice.actions;

export default notificacionSlice.reducer;
