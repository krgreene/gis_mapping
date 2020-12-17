import React, { useEffect } from 'react'
import L from 'leaflet'

require('leaflet.utm')

export default function Map() {

    const handleMapClick = (event) => {
        console.log("Clicked", event)
        let popup = L.popup({className: 'popup'}).setLatLng(event.latlng)
        let utm = popup.getLatLng().utm()
        // convert from WGS84 to NAD27 on Barbados 1:50000 1993 UTM map
        let lat = utm.x - 74
        let lng = utm.y - 191
        console.log("UTM", utm)
        popup
            .setContent(lat.toString().slice(1,4) + lng.toString().slice(2,5))
            .openOn(event.target)
    }

    const streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 11,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid3JpdGUyayIsImEiOiJjazR4c2owa2owNDhwM2xtYm1obmVoMjNrIn0.sXOqGlRgdTmNV6nAlAX6WQ'
    })

    const satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 11,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid3JpdGUyayIsImEiOiJjazR4c2owa2owNDhwM2xtYm1obmVoMjNrIn0.sXOqGlRgdTmNV6nAlAX6WQ'
    })

    const baseMaps = {
        "Streets": streets,
        "Satellite": satellite
    }

    const overlays = {

    }

    useEffect(() => {
        const map = L.map('map', {
            center: [13.175159, -59.564590],
            zoom: 12,
            zoomDelta: 1,
            maxBounds: [[12.942617, -59.870924], [13.476728, -59.261870]],
            layers: [streets]
        })
        .on('click', handleMapClick);

        L.control.layers(baseMaps, overlays).addTo(map);
    }, []);

    return (
        <div>
            <div>
                <p>Click the map to get the 6-Figure UTM Grid Reference.<br />The map generates the NAD27 grid coordinates corresponding to the 1:50 000 Barbados Map 1993.</p>
            </div>
            <div id={'map'}></div>
        </div>
    )
}