import React from "react"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResults"


import { useLocalStore } from "mobx-react";
import MapBody from "./MapBody";

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        searchText: "",
        mapState: {
            lng: 72.562744140625,
            lat: 23.037763595581055,
            zoom: 18
        }
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
            <div className="container">
                <SearchBar />
                <SearchResult/>
                <MapBody/>
            </div>
        </StoreProvider>
    )
}

export default App;