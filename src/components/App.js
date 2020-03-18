import React from "react"
import SearchBar from "./SearchBar"


import { useLocalStore } from "mobx-react";
import MapBody from "./MapBody";

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        searchText: "",
        mapState: {
            lng: 73.18130097069718,
            lat: 22.326737087756456,
            zoom: 12
        },
        suggestions:false
    }))
    return (
        <StoreContext.Provider 
            value={store}>
            {children}
        </StoreContext.Provider>
    )
}

const App = () => {
    return (
        <StoreProvider>
            <div className="container mainWrapper">
                <SearchBar />
                <MapBody/>
            </div>
        </StoreProvider>
    )
}

export default App;