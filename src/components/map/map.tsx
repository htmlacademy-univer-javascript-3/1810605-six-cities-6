import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Location, Offer } from '../../types';
import useMap from '../../hooks/use-map';

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

type MapPoint = {
  id: string;
  location: Location;
};

interface MapProps {
  city: City;
  points?: MapPoint[] | Offer[];
  offers?: Offer[];
  selectedPointId?: string;
  activePointId?: string;
  selectedOffer?: Offer | undefined;
  className?: string;
}

function Map({
  city,
  points,
  offers,
  selectedPointId,
  activePointId,
  selectedOffer,
  className
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const pointsToRender = (points ?? offers ?? []).map((point) => ({
        id: point.id,
        location: point.location
      }));
      const highlightedIds = new Set(
        [activePointId, selectedPointId, selectedOffer?.id].filter(
          (value): value is string => Boolean(value)
        )
      );

      pointsToRender.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            highlightedIds.has(offer.id)
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, offers, selectedPointId, activePointId, selectedOffer]);

  return (
    <section className={className ?? 'cities__map map'}>
      <div style={{ height: '100%' }} ref={mapRef}></div>
    </section>
  );
}

export default Map;
