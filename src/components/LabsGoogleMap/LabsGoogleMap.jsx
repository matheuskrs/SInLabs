import { use, useEffect, useMemo, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import styles from "./labsGoogleMap.module.css";

setOptions({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

const googleMapsPromise = importLibrary("maps").then((mapsLib) => ({
  mapsLib,
  google: window.google,
}));

function getLatLng(lab) {
  const raw = lab?.coordinates;
  if (!raw) return null;

  const [lat, lng] = String(raw)
    .split(",")
    .map((v) => Number(v.trim()));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

export default function LabsGoogleMap({ labs, selectedLabId, onSelectLab }) {
  const { mapsLib, google } = use(googleMapsPromise);

  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);
  const markersRef = useRef(new Map());

  const validLabs = useMemo(
    () =>
      (labs || [])
        .map((lab) => ({ lab, pos: getLatLng(lab) }))
        .filter((x) => !!x.pos),
    [labs],
  );

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    const first = validLabs[0]?.pos;
    const center = first ?? { lat: -23.55052, lng: -46.633308 };

    mapRef.current = new mapsLib.Map(mapDivRef.current, {
      center,
      zoom: first ? 12 : 5,
    });

    infoRef.current = new google.maps.InfoWindow();
  }, [mapsLib, google, validLabs]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    for (const [labId, m] of markersRef.current.entries()) {
      if (!validLabs.some((x) => x.lab.id === labId)) {
        m.setMap(null);
        markersRef.current.delete(labId);
      }
    }

    for (const { lab, pos } of validLabs) {
      if (markersRef.current.has(lab.id)) continue;

      const m = new google.maps.Marker({
        map,
        position: pos,
        title: lab.name,
      });

      m.addListener("click", () => {
        onSelectLab?.(lab.id);
        infoRef.current?.setContent(
          `<div style="font-weight:600">${lab.name ?? ""}</div><div>${lab.city ?? ""}</div>`,
        );
        infoRef.current?.open(map, m);
      });

      markersRef.current.set(lab.id, m);
    }

    if (selectedLabId) {
      const m = markersRef.current.get(selectedLabId);
      if (!m) return;

      const pos = m.getPosition?.();
      if (!pos) return;

      map.panTo(pos);
      map.setZoom(15);

      infoRef.current?.setContent(
        `<div style="font-weight:600">${m.getTitle?.() ?? ""}</div>`,
      );
      infoRef.current?.open(map, m);
    }
  }, [google, validLabs, selectedLabId, onSelectLab]);

  return <div ref={mapDivRef} className={styles.map} />;
}
