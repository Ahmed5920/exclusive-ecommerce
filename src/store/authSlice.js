import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    loading:false,
    error:null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser(state,action){
            state.user = action.payload
        },
        setLoading(state, action){
            state.loading = action.payload
        },
        setError(state,action){
            state.error = action.payload
        },
        logOut(state){
            state.user=null;
        }
    }
})

export const {setUser,setLoading,setError,logOut} = authSlice.actions;
export default authSlice.reducer;