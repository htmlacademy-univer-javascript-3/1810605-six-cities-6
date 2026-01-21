import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useMap from '../use-map';
import { City } from '../../types';

type MapMock = {
  addLayer: (...args: unknown[]) => unknown;
  setView: (...args: unknown[]) => unknown;
  getZoom: () => number;
};

let lastMapInstance: MapMock | null = null;

vi.mock('leaflet', () => {
  class Map {
    public addLayer = vi.fn() as (...args: unknown[]) => unknown;
    public setView = vi.fn() as (...args: unknown[]) => unknown;
    public getZoom = vi.fn(() => 10) as () => number;
    constructor(el: HTMLElement, options: { center: { lat: number; lng: number }; zoom: number }) {
      void el;
      void options;
      lastMapInstance = {
        addLayer: this.addLayer,
        setView: this.setView,
        getZoom: this.getZoom
      };
    }
  }
  class TileLayer {
    constructor(url: string, options: object) {
      void url;
      void options;
    }
  }
  return { Map, TileLayer };
});

describe('useMap', () => {
  beforeEach(() => {
    lastMapInstance = null;
  });

  it('initializes map and adds tile layer', () => {
    const mapRef = { current: document.createElement('div') };
    const city: City = {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499 }
    };

    renderHook(() => useMap(mapRef, city));

    expect(lastMapInstance).not.toBeNull();
    expect(lastMapInstance?.addLayer).toHaveBeenCalledTimes(1);
  });

  it('updates map view when city changes', async () => {
    const mapRef = { current: document.createElement('div') };
    const city: City = {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499 }
    };
    const nextCity: City = {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976 }
    };

    const { rerender } = renderHook(({ currentCity }) => useMap(mapRef, currentCity), {
      initialProps: { currentCity: city }
    });

    act(() => {
      rerender({ currentCity: nextCity });
    });

    await waitFor(() => {
      expect(lastMapInstance?.setView).toHaveBeenCalledWith(
        { lat: nextCity.location.latitude, lng: nextCity.location.longitude },
        expect.any(Number)
      );
    });
  });
});
