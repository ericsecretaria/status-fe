import { createAsyncThunk } from "@reduxjs/toolkit";

//! Reset Success action
export const resetSuccessAction = createAsyncThunk(
  "reset-success-action",
  () => {
    return true;
  }
);

//! Reset Erro action
export const resetErrorAction = createAsyncThunk("reset-error-action", () => {
  return true;
});
