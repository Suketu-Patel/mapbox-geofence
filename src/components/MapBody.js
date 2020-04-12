import React, { useContext, useEffect, useState } from "react"
import mapboxgl from 'mapbox-gl'
import { StoreContext } from "./App"
import "./site.css"
import { reaction} from "mobx"
import geofence from "../utils/geofence"
import { displayNotification } from "../utils/pushNotification"

const MapBody = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    const store = useContext(StoreContext);
    let my_app;
    const [radius,setRadius] = useState(500);
    const drawCircle = () =>{
        if(radius<3000){
            store.radius = radius
        }else{
            store.radius=500;
        }
        
    }
    const metersToPixelsAtMaxZoom = (meters, latitude) =>
        meters / 0.075 / Math.cos(latitude * Math.PI / 180);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: my_app,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [store.mapState.lng, store.mapState.lat],
            zoom: store.mapState.zoom,
        })
        // https://i.imgur.com/MK4NUzI.png
        const marker = new mapboxgl.Marker({
            draggable:true,
            color: "rgb(233, 58, 58)"
        })
        .setLngLat([store.mapState.lng, store.mapState.lat])
        .addTo(map);
        
        const marker2 = new mapboxgl.Marker({
            draggable:true,
            color: "rgb(58, 58, 233)"
        })
        .setLngLat([store.mapState.lng+0.005, store.mapState.lat+0.005])
        .addTo(map);
        
        const redraw = ()=>{
            map.getSource("source_circle_500").setData({
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [store.mapState.lng, store.mapState.lat]
                  }
                }]
              })
        }

        const setGeofence = ()=>{
            store.geoFence = (
            geofence(
                store.mapState.lat,
                store.mapState.lat2,
                store.mapState.lng,
                store.mapState.lng2
            )<store.radius/1000)
            console.log(store.geoFence)
            console.log(store.radius/1000)
        }

        map.on('load', function() {
            map.addSource("source_circle_500", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [store.mapState.lng, store.mapState.lat]
                    }
                    }]
                }
                });
        
                map.addLayer({
                "id": "circle500",
                "type": "circle",
                "source": "source_circle_500",
                "paint": {
                    "circle-radius": {
                    stops: [
                        [0,0],
                        [20,0]
                    ],
                    base: 2
                    },
                    "circle-color": "red",
                    "circle-opacity": 0.5,
                    "circle-radius-transition": {duration: 500}
                }
                });
                map.setPaintProperty("circle500","circle-radius",{
                stops: [
                    [0,0],
                    [20, metersToPixelsAtMaxZoom(store.radius, store.mapState.lat)]
                ],
                base: 2
                })
                //   cir.paint["circle-color"] = "blue"
        });
        reaction(()=>[store.radius,store.geoFence],()=>{
            map.setPaintProperty("circle500","circle-radius",{
                stops: [
                  [0,0],
                  [20, metersToPixelsAtMaxZoom(store.radius, store.mapState.lat)]
                ],
                base: 2
            })
            map.setPaintProperty("circle500","circle-color",(store.geoFence)?"green":"red")
        })

        reaction(() => [store.mapState.lng, store.mapState.lat], () => {
            map.flyTo(
                {
                    center: [store.mapState.lng, store.mapState.lat],
                    zoom: 16,
                    speed: 1.5,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                }
            );
            marker.setLngLat([store.mapState.lng, store.mapState.lat])
            redraw();
            setGeofence();
            
        })
        marker.on('dragend',()=>{
            let lnglat = marker.getLngLat();
            store.mapState.lat = lnglat.lat;
            store.mapState.lng = lnglat.lng;
            setGeofence();
        })
        marker2.on('dragend',()=>{
            let lnglat = marker2.getLngLat();
            store.mapState.lat2 = lnglat.lat;
            store.mapState.lng2 = lnglat.lng;
            if(geofence(
                store.mapState.lat,
                store.mapState.lat2,
                store.mapState.lng,
                store.mapState.lng2,
            )<(store.radius/1000)){
                store.geoFence=true;
                displayNotification()
            } else {
                store.geoFence = false;
            }
        })
        //eslint-disable-next-line
    }, []);

    return (
        <div style={{height:"100%"}}>
            <div ref={el => my_app = el} className="my_app">
            </div>
            <pre id = "coordinates" className="coordinates"></pre>
            <input className="form-control mr-2 searchBar" value={radius} onChange={(e)=>{setRadius(e.target.value)}} placeholder="Radius"></input>
            <button className="setcoordbtn btn btn-primary mt-1 mb-2 w-100" onClick={drawCircle}>Set Radius</button>
            <button className="setcoordbtn btn btn-danger w-100" onClick={()=>{alert("LNG: "+store.mapState.lng+" LAT: "+store.mapState.lat)}}>Set Location</button>
        </div>

    )
}

export default MapBody;