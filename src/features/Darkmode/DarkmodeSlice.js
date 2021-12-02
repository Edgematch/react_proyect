import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dark: false
}

const DarkmodeSlice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
        turnDarkMode: (state) =>{ 
            state.dark = !state.dark
        }
    }
});

export const selectDarkmodeState = state => state.darkmode.dark

export const {
    turnDarkMode
} = DarkmodeSlice.actions
export default DarkmodeSlice.reducer