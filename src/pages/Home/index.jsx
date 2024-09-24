import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Home = () => {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlsbHoiLCJhIjoiY20xZ3Uya3dzMDhsdzJxcHUzNGZqMXNuNiJ9.PUKTvdo5BI3zigYD5KBLaA'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
        });

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return(
    <>
        <div classname="h-screen w-screen bg-gray-50" id='map-container' ref={mapContainerRef}/>
    </>
    )
};
export default Home;