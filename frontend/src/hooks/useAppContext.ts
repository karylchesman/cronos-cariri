import { useContext } from "react"
import { AppContext } from "../context/AppContextProvider"

export const useAppContext = () => {
    return useContext(AppContext);
}