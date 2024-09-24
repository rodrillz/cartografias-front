import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';



function App() {

    const mapRef = useRef()
    const mapContainerRef = useRef()
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlsbHoiLCJhIjoiY20xZ3Uya3dzMDhsdzJxcHUzNGZqMXNuNiJ9.PUKTvdo5BI3zigYD5KBLaA'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-70.74194, -34.16442],
            zoom: 18,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    id:"memorial",
                    type: 'Feature',
                    properties: {
                        message: 'Paseo de los Derechos Humanos, Escultura El Abrazo Solidario y Piedra Verde',
                        imageId: 1011,
                        iconSize: [60, 60]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-70.74191666666667, -34.165]
                    }
                },
                {
                    id:"memorial",
                    type: 'Feature',
                    properties: {
                        message: 'Población Salvador Allende.',
                        imageId: 870,
                        iconSize: [51, 50]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-70.6485414, -34.1678034]
                    }
                },
                {
                    id:"memorial",
                    type: 'Feature',
                    properties: {
                        message: 'Calle Profesor Luis Almonacid.',
                        imageId: 837,
                        iconSize: [40, 40]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-70.7046548, -34.167417]
                    }
                }
            ]
        };

        mapRef.current.on('style.load', () => {
            const layers = mapRef.current.getStyle().layers;

            // Verificación para evitar errores si no se encuentra la capa
            const labelLayer = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            );

            if (labelLayer) {
                const labelLayerId = labelLayer.id;

                mapRef.current.addLayer(
                    {
                        id: 'add-3d-buildings',
                        source: 'composite',
                        'source-layer': 'building',
                        filter: ['==', 'extrude', 'true'],
                        type: 'fill-extrusion',
                        minzoom: 15,
                        paint: {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                );
            } else {
                console.warn("No se encontró una capa con 'text-field' en el layout");
            }

            mapRef.current.on('click', 'memorial', (e) => {
                mapRef.current.flyTo({
                    center: e.features[0].geometry.coordinates
                });
            });

            mapRef.current.on('mouseenter', 'memorial', () => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
            });

            mapRef.current.on('mouseleave', 'memorial', () => {
                mapRef.current.getCanvas().style.cursor = '';
            });
        });

        for (const marker of geojson.features) {
            const el = document.createElement('div');
            const width = marker.properties.iconSize[0];
            const height = marker.properties.iconSize[1];
            el.className = 'marker';
            el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';
            el.style.display = 'block';
            el.style.border = 'none';
            el.style.borderRadius = '50%';
            el.style.cursor = 'pointer';
            el.style.padding = 0;

            el.addEventListener('click', () => {
                window.alert(marker.properties.message);
            });

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(mapRef.current);
        }

        return () => {
            mapRef.current.remove();
        };
    }, []);
    return (
        <>
            <div id='map-container' ref={mapContainerRef}/>
        </>
    )
}

export default App
