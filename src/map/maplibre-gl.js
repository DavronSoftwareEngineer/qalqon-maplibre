import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import mapData from "./map.json";
console.log(mapData);
function MapLibreGl() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(69.279737);
  const [lat] = useState(41.311158);
  const [zoom] = useState(14);
  const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL";
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapData,
      center: [lng, lat],
      zoom: zoom,
      pitch: 80,
      bearing: -17.6,
      antialias: true,
    });

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.current.addSource("openmaptiles", {
        url: mapData,
        type: "vector",
        tiles: ['./tiles.pbf'],
      });

      map.current.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              0,
              "lightgrey",
              200,
              "royalblue",
              400,
              "lightblue",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              16,
              ["get", "render_height"],
            ],
            "fill-extrusion-base": [
              "case",
              [">=", ["get", "zoom"], 16],
              ["get", "render_min_height"],
              0,
            ],
          },
        },
        labelLayerId
      );
    });
  }, [map.current]);
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default MapLibreGl;
