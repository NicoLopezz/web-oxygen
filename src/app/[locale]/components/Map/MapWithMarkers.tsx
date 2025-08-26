import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import './styles.css';  

import { geojsonData } from './constants';
import { useTranslations } from 'next-intl';



mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string | "";


interface VideoModalProps {
  videoID: string | null;
  onClose: () => void;
}

const VideoModal = ({ videoID, onClose }: VideoModalProps) => {
  if (!videoID) return null;

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="1000"
          height="600"
          src={`https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1&vr=1&vq=hd1080&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const MapWithMarkers = () => {
  const projectIdioms = useTranslations("Project");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedVideoID, setSelectedVideoID] = useState(null);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/mapbox/satellite-v9', 
      attributionControl: false 
    });

    mapRef.current = map;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        map.flyTo({
          center: [-61.901847, -24.201291], 
          zoom: 10, 
          speed: 0.8, 
          animate: true, 
          curve: 1, 
          pitch: 40, 
          essential: true 
        });
      });
    }, {
      threshold: 0.5
    });

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    map.on('load', () => {
        
        map.addSource('terrain', {
          'type': 'geojson',
          'data': geojsonData, 
        });
  
        
        const outerBounds = [
          [-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]
        ]; 
  
        
        let innerPolygon: number[][] = [];
        if (geojsonData.features[0].geometry.type === 'Polygon') {
          innerPolygon = (geojsonData.features[0].geometry as GeoJSON.Polygon).coordinates[0];
        }
  
        
        const maskData : GeoJSON.Feature = {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [outerBounds, innerPolygon] 
          },
          'properties': {}
        };
  
        map.addSource('mask', {
          'type': 'geojson',
          'data': maskData
        });
  
        
        map.addLayer({
          'id': 'mask-layer',
          'type': 'fill',
          'source': 'mask',
          'layout': {},
          'paint': {
            'fill-color': 'rgba(255, 255, 255, 0.25)' 
          }
        });
  
        
        if (geojsonData.features) {
          geojsonData.features.forEach((feature : GeoJSON.Feature) => {
            if (feature.geometry.type === 'Point') {
              const coordinates = feature.geometry.coordinates;
              const LnLat = new mapboxgl.LngLat(coordinates[0], coordinates[1]);

              const videoID = feature.properties?.videoID; 
  
              
              const marker = new mapboxgl.Marker({
                color: '#FF0000', 
                draggable: false, 
                clickTolerance: 10 
              },)
                .setLngLat(LnLat)
                .addTo(map);
              
              marker.getElement().style.cursor = 'pointer'; 
  
              marker.getElement().addEventListener('click', () => {
                console.log('Click en el marker');
                setSelectedVideoID(videoID); 
              });
            }
          });
        }
  
        
        // if (geojsonData.features) {
        //   const coordinates = geojsonData.features[0].geometry.coordinates[0];
        //   const bounds = coordinates.reduce((bounds, coord) => {
        //     return bounds.extend(coord);
        //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));  
        // }

        
      });

    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [geojsonData]);

  return <div>
          <div className='map-with-markers' ref={mapContainerRef}>
            <div className='map-overlay'>
              <h1>{projectIdioms('map-with-markers-title')}</h1>
              <p>{projectIdioms('map-with-markers-description')}</p>
            </div>
          </div>
          <VideoModal videoID={selectedVideoID} onClose={() => setSelectedVideoID(null)} />
        </div>;
};

export default MapWithMarkers;
