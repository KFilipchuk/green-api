import {RootState} from "@/shared/store";

export const selectUserAuthData = (state: RootState) => state.user.authData
