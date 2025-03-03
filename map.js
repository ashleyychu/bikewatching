// Import Mapbox as an ESM module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json'

// Check that Mapbox GL JS is loaded
console.log("Mapbox GL JS Loaded:", mapboxgl);

 // Set your Mapbox access token here
 mapboxgl.accessToken = 'pk.eyJ1IjoiYThjaHUiLCJhIjoiY203bGxsOGljMGEzeTJrcTRtZmF2NmIzeiJ9.jo2-i09IgUs0PFxx2PcOxA';

 // Initialize the map
 const map = new mapboxgl.Map({
   container: 'map', // ID of the div where the map will render
   style: 'mapbox://styles/mapbox/streets-v12', // Map style
   center: [-71.09415, 42.36027], // [longitude, latitude]
   zoom: 12, // Initial zoom level
   minZoom: 5, // Minimum allowed zoom
   maxZoom: 18 // Maximum allowed zoom
 });

 map.on('load', async () => { 
    map.addSource('boston_route', {
        type: 'geojson',
        data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson'
      });
      map.addLayer({
        id: 'bike-lanes',
        type: 'line',
        source: 'boston_route',
        paint: {
          'line-color': 'green',
          'line-width': 3,
          'line-opacity': 0.4
        }
      });

      map.addSource('cambridge', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson'
      });
      map.addLayer({
        id: 'cambridge-lanes',
        type: 'line',
        source: 'cambridge',
        paint: {
          'line-color': 'green',
          'line-width': 3,
          'line-opacity': 0.4
        }
      });

      let jsonData;
        try {
            const jsonurl = INPUT_BLUEBIKES_CSV_URL;
            
            // Await JSON fetch
            const jsonData = await d3.json(jsonurl);
            
            console.log('Loaded JSON Data:', jsonData); // Log to verify structure
        } catch (error) {
            console.error('Error loading JSON:', error); // Handle errors
        }

        let stations = jsonData.data.stations;
        console.log('Stations Array:', stations);
  });