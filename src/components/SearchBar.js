import React, { useContext,useState } from "react"
import { StoreContext } from "./App";

const SearchBar = () => {

    const store = useContext(StoreContext);
    const [searchText,setSearchText] = useState("");

    const getResults = (e)=>{
        setSearchText(e.target.value)
    }
    return (
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                store.searchText = searchText;
            }}>
                <div className="form-group mt-5">
                    <label>Serach for place</label>
                    <input 
                        type="text"
                        className="form-control" 
                        onChange={getResults}>
                    </input>
                </div>
                    
            </form>
        </div>
    )
}
export default SearchBar;