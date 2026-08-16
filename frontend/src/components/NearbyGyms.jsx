import React, { useState, useEffect } from 'react';
import WindowDots from './WindowDots';

// Pre-configured coordinates for quick manual search fallback
const CITY_PRESETS = [
  { name: 'Greater Noida', lat: 28.4744, lng: 77.5040 },
  { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
];

export default function NearbyGyms() {
  const [coords, setCoords] = useState(null); // { lat, lng, source: 'gps' | 'manual', cityName?: string }
  const [radius, setRadius] = useState(5000); // meters
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geoStatus, setGeoStatus] = useState('prompt'); // 'prompt' | 'requesting' | 'granted' | 'denied' | 'unavailable'
  const [manualCityInput, setManualCityInput] = useState('');

  // ── 1. Request Browser Geolocation on Mount ───────────────────────────────
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      setError('Geolocation is not supported by your browser. Please enter your location manually.');
      return;
    }

    setGeoStatus('requesting');
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          source: 'gps',
        };
        setCoords(userCoords);
        setGeoStatus('granted');
      },
      (err) => {
        console.warn('[NearbyGyms] Geolocation denied/failed:', err.message);
        setGeoStatus('denied');
        setError('Location access was denied or timed out. Please allow location permissions in your browser or select a city below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  // ── 2. Fetch Nearby Gyms when Coords or Radius Change ──────────────────────
  useEffect(() => {
    if (!coords?.lat || !coords?.lng) return;

    const fetchGyms = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `http://localhost:5000/api/gyms/nearby?lat=${coords.lat}&lng=${coords.lng}&radius=${radius}`
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to load nearby gyms.');
        }

        setGyms(data.gyms || []);
      } catch (err) {
        console.error('[NearbyGyms] Fetch error:', err.message);
        setError(err.message || 'Error connecting to gyms API.');
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, [coords, radius]);

  // ── 3. Manual City Preset / Input Handlers ────────────────────────────────
  const handleSelectCityPreset = (preset) => {
    setCoords({ lat: preset.lat, lng: preset.lng, source: 'manual', cityName: preset.name });
    setGeoStatus('granted');
    setError('');
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualCityInput.trim()) return;

    // Check if input matches preset or default to nearest major hub
    const matched = CITY_PRESETS.find(
      (c) => c.name.toLowerCase() === manualCityInput.trim().toLowerCase()
    );

    if (matched) {
      handleSelectCityPreset(matched);
    } else {
      // Default to Greater Noida / Delhi NCR baseline for demo manual searches
      setCoords({
        lat: 28.4744,
        lng: 77.5040,
        source: 'manual',
        cityName: manualCityInput.trim(),
      });
      setGeoStatus('granted');
      setError('');
    }
  };

  return (
    <div className="relative animate-fadeIn space-y-6">
      <WindowDots />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
              Nearby Fitness Centers & Gyms
            </h3>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">
            Discover equipped training facilities in your radius to execute your protocol.
          </p>
        </div>

        {/* Radius Selector + Refresh Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-surface-container border border-surface-variant text-on-surface font-headline text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-primary cursor-pointer"
          >
            <option value={2000}>2 km Radius</option>
            <option value={5000}>5 km Radius</option>
            <option value={10000}>10 km Radius</option>
          </select>

          <button
            onClick={requestLocation}
            title="Refresh Location"
            className="p-2 rounded-lg bg-surface-container border border-surface-variant text-on-surface-variant hover:text-primary hover:border-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm block">my_location</span>
          </button>
        </div>
      </div>

      {/* ── Permission Denied / Manual Location Search Box ── */}
      {(geoStatus === 'denied' || geoStatus === 'unavailable') && (
        <div className="p-5 bg-surface-container rounded-2xl border-2 border-tertiary/40 space-y-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary text-2xl shrink-0 mt-0.5">
              near_me_disabled
            </span>
            <div>
              <p className="font-headline text-sm font-bold text-tertiary uppercase tracking-wider">
                Location Access Required
              </p>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Allow browser location permissions to find gyms closest to your exact coordinates, or choose a city below:
              </p>
            </div>
          </div>

          {/* Quick City Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] uppercase font-headline font-bold text-on-surface-variant mr-1">
              Quick Select:
            </span>
            {CITY_PRESETS.map((city) => (
              <button
                key={city.name}
                onClick={() => handleSelectCityPreset(city)}
                className="px-3 py-1.5 rounded-lg bg-surface border border-surface-variant text-xs font-headline font-semibold text-on-surface hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleManualSearch} className="flex gap-2 pt-1">
            <input
              type="text"
              value={manualCityInput}
              onChange={(e) => setManualCityInput(e.target.value)}
              placeholder="Or enter your city/locality (e.g. Greater Noida)..."
              className="flex-1 bg-surface border border-outline-variant rounded-xl px-4 py-2 text-xs font-medium text-on-surface outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs uppercase font-extrabold tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && geoStatus !== 'denied' && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-error text-xl shrink-0 mt-0.5">error</span>
          <div>
            <p className="font-headline text-xs font-bold text-error uppercase tracking-wider">Search Notice</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* ── Loading Skeleton ── */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-surface-container rounded-xl p-5 border border-surface-variant animate-pulse space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="h-4 bg-surface-variant rounded w-3/5" />
                <div className="h-4 bg-surface-variant rounded w-16" />
              </div>
              <div className="h-3 bg-surface-variant rounded w-4/5" />
              <div className="h-3 bg-surface-variant rounded w-1/2" />
              <div className="pt-2 flex justify-between items-center">
                <div className="h-6 bg-surface-variant rounded w-20" />
                <div className="h-8 bg-surface-variant rounded w-28" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Gym Results Grid ── */}
      {!loading && gyms.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-headline px-1">
            <span>
              Found <strong className="text-primary">{gyms.length}</strong> facilities within {radius / 1000} km
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-75">Sorted by Proximity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gyms.map((gym, idx) => (
              <div
                key={gym.placeId || idx}
                className="bg-surface-container rounded-xl border-2 border-surface-variant hover:border-primary transition-all p-5 flex flex-col justify-between shadow-lg group"
              >
                <div>
                  {/* Title & Distance Badge */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-headline text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {gym.name}
                    </h4>
                    <span className="shrink-0 px-2.5 py-1 bg-primary/10 text-primary border border-primary/30 rounded-lg font-headline text-xs font-black">
                      {gym.distance}
                    </span>
                  </div>

                  {/* Address */}
                  <p className="text-xs text-on-surface-variant flex items-start gap-1.5 mb-3 line-clamp-2">
                    <span className="material-symbols-outlined text-xs shrink-0 mt-0.5 text-on-surface-variant/60">
                      place
                    </span>
                    {gym.address}
                  </p>
                </div>

                {/* Rating & Operational Status & Action */}
                <div className="pt-3 border-t border-surface-variant flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-3">
                    {/* Stars / Rating */}
                    {gym.rating ? (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-tertiary text-sm icon-fill">star</span>
                        <span className="font-headline text-xs font-bold text-on-surface">{gym.rating}</span>
                        {gym.userRatingsTotal > 0 && (
                          <span className="text-[10px] text-on-surface-variant/60">({gym.userRatingsTotal})</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] text-on-surface-variant/60 italic font-body">No reviews yet</span>
                    )}

                    {/* Open Status Badge */}
                    {gym.isOpenNow !== null && (
                      <span
                        className={`text-[9px] font-headline uppercase font-extrabold px-2 py-0.5 rounded border ${
                          gym.isOpenNow
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {gym.isOpenNow ? 'Open Now' : 'Closed'}
                      </span>
                    )}
                  </div>

                  {/* View on Maps CTA Button */}
                  <a
                    href={gym.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-outline-variant text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all font-headline text-xs font-bold uppercase tracking-wider shrink-0"
                  >
                    <span className="material-symbols-outlined text-[14px]">map</span>
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && gyms.length === 0 && (coords?.lat || geoStatus === 'granted') && (
        <div className="py-12 px-4 bg-surface rounded-2xl border border-surface-variant text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40">
            fitness_center
          </span>
          <h4 className="font-headline text-base font-bold text-on-surface">No Gyms Found Nearby</h4>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            We couldn’t find any gyms within {radius / 1000} km of this location. Try increasing the search radius to 10 km above or searching for another city.
          </p>
        </div>
      )}
    </div>
  );
}
