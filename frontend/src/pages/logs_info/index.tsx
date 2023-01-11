import { FC, useCallback, useMemo, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { LatLngLiteral, MarkerOptions, DirectionsResult } from "@/models";

import { defaultCenter, libraries, options } from "@/utils";

import { FaArrowLeft } from "react-icons/fa";

import pinRoadClosure from "@/Assets/svg/pinRoadClosure.svg";

import "./style.css";

const LogInfo: FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const navigate = useNavigate();

  const { state } = useLocation();

  const [directions, setDirections] = useState<DirectionsResult>();

  const Origin: LatLngLiteral = { lat: 14.6825, lng: 121.0599 };
  const Destination: LatLngLiteral = { lat: 14.6821, lng: 121.0591 };

  const markerOptions: MarkerOptions = {
    icon: {
      url: pinRoadClosure,
      // scaledSize: new google.maps.Size(40, 40),
    },
  };

  const fetchDirections = (
    origin: LatLngLiteral,
    destination: LatLngLiteral
  ) => {
    if (!origin && !destination) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const drawDirection = useMemo(() => {
    if (isLoaded) {
      fetchDirections(Origin, Destination);
    }
  }, [isLoaded]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);

  const onUnMount = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  if (loadError) return <div>"Error Loading Maps"</div>;
  if (!isLoaded) return <div>"Loading Maps........"</div>;

  return (
    <div className="logsInfo">
      <div className="info-cont">
        <p className="bck-cont" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} />
        </p>

        <div className="info-title">
          <h1>Project Title</h1>
        </div>
        <div className="info-title">
          <h3>Project Details</h3>
        </div>

        <ul className="info-dates">
          <li className="date-title">DATES</li>
          <li className="li-dates">Date started</li>
          <li className="li-dates">Date ended</li>
        </ul>

        <ul className="city-project-info">
          <li>LOCATION</li>
          <li>CONTRACTOR</li>
          <li>SOURCE FUND</li>
          <li>PROGRAM AMOUNT</li>
          <li>CONTRACTOR AMOUNT</li>
        </ul>
      </div>
      <div className="map-cont">
        <GoogleMap
          mapContainerClassName="mapContainerStyle"
          center={defaultCenter}
          zoom={15}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnMount}
        >
          {directions ? (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: false,
                markerOptions: markerOptions,
              }}
            />
          ) : null}
        </GoogleMap>
        <>{drawDirection}</>
      </div>
    </div>
  );
};
export default LogInfo;
