import React, { useRef, useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
function MapLibreGl() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(69.279737);
  const [lat] = useState(41.311158);
  const [zoom] = useState(11);
  useEffect(() => {
    const initializeMap = () => {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/634bdb88-532d-49d2-955b-777f4a114ec6/style.json?key=1ckMMoqiRZ5Kad4WeOjq`,
        center: [lng, lat],
        zoom: zoom,
        pitch: 0,
        bearing: -17.6,
        antialias: true,
      });
    };


    if (!map.current) {
      initializeMap();
    }

    map.current.on("load", () => {
      
      map.current?.on("mouseenter", "3d-buildings", (e) => {
        map.current.getCanvas().style.cursor = "pointer";
        var feature = e.features[0];
        var color = "#07257F";

        map.current.setPaintProperty("3d-buildings", "fill-extrusion-color", [
          "case",
          ["==", ["id"], feature.id],
          color,
          [
            "interpolate",
            ["linear"],
            ["get", "render_height"],
            0,
            "#1e88e5",
            30,
            "#1966d2",
            70,
            "#1555c0",
            100,
            "#0d47a1",
          ],
        ]);
      });

      map.current?.on("click", "3d-buildings", (e) => {
        map.current.getCanvas().style.cursor = "pointer";
        var feature = e.features[0];
        var color = "yellow";
        map.current?.setPaintProperty("3d-buildings", "fill-extrusion-color", [
          "case",
          ["==", ["id"], feature.id],
          color,
          [
            "interpolate",
            ["linear"],
            ["get", "render_height"],
            0,
            "#1e88e5",
            30,
            "#1966d2",
            70,
            "#1555c0",
            100,
            "#0d47a1",
          ],
        ]);
      });

      map.current?.on("mouseout", "3d-buildings", () => {
        map.current.getCanvas().style.cursor = "";
        map.current?.setPaintProperty("3d-buildings", "fill-extrusion-color", [
          "interpolate",
          ["linear"],
          ["get", "render_height"],
          0,
          "#1e88e5",
          30,
          "#1966d2",
          70,
          "#1555c0",
          100,
          "#0d47a1",
        ]);
      });
    });
  }, []);
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default MapLibreGl;
