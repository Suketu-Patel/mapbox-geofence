import React from "react"
import SearchBar from "./SearchBar"


import { useLocalStore } from "mobx-react";
import MapBody from "./MapBody";
import { requestPermission,registerServiceWorker } from "../utils/pushNotification";

export const StoreContext = React.createContext();
requestPermission();
registerServiceWorker()
const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        searchText: "",
        mapState: {
            lng: 73.18130097069718,
            lat: 22.326737087756456,
            lng2: 73.18130097069718,
            lat2: 22.326737087756456,
            zoom: 12
        },
        suggestions:false,
        radius:500,
        geoFence:false
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