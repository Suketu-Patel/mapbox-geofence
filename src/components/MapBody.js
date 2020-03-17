import React, { useContext, useEffect } from "react"
import mapboxgl from 'mapbox-gl'
import { StoreContext } from "./App"
import "./site.css"
import { autorun, reaction } from "mobx"

const MapBody = ()=>{

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    const store = useContext(StoreContext);
    let my_app;
    useEffect(()=> {
        
        const map = new mapboxgl.Map({
            container: my_app,
            style:'mapbox://styles/mapbox/streets-v11',
            center: [store.mapState.lng, store.mapState.lat],
            zoom: store.mapState.zoom,
        })
        map.on('move',()=>{
            store.mapState.lng = map.getCenter().lng.toFixed(4);
            store.mapState.lat = map.getCenter().lat.toFixed(4);
            store.mapState.zoom = map.getZoom().toFixed(2);
        })
        console.log(store.mapState.lng,store.mapState.lat);
        //eslint-disable-next-line
    },[])

    reaction(()=>{
        const map = new mapboxgl.Map({
            container: my_app,
            style:'mapbox://styles/mapbox/streets-v11',
            center: [store.mapState.lng, store.mapState.lat],
            zoom: store.mapState.zoom,
        })
    })

    return (
        <div>
            <div ref={el=>my_app=el} className="my_app">
            </div>
        </div>
        
    )
}

export default MapBody