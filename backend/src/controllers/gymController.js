import axios from 'axios';

/**
 * Calculate distance in kilometers between two geographic coordinates using the Haversine formula.
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Fetch nearby gyms using Google Places API (New)
 */
async function fetchWithPlacesApiNew(userLat, userLng, radius, apiKey) {
  const url = 'https://places.googleapis.com/v1/places:searchNearby';
  const response = await axios.post(
    url,
    {
      includedTypes: ['gym', 'fitness_center'],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: {
            latitude: userLat,
            longitude: userLng,
          },
          radius: parseFloat(radius),
        },
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.currentOpeningHours,places.googleMapsUri',
      },
    }
  );

  const rawPlaces = response.data?.places || [];

  return rawPlaces.map((place) => {
    const gymLat = place.location?.latitude;
    const gymLng = place.location?.longitude;

    let distKm = 0;
    if (gymLat !== undefined && gymLng !== undefined) {
      distKm = calculateHaversineDistance(userLat, userLng, gymLat, gymLng);
    }

    const name = place.displayName?.text || 'Gym';
    const placeId = place.id || '';
    const mapsUrl =
      place.googleMapsUri ||
      (placeId
        ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`);

    return {
      placeId,
      name,
      address: place.formattedAddress || 'Address unavailable',
      rating: place.rating || null,
      userRatingsTotal: place.userRatingCount || 0,
      distanceKm: parseFloat(distKm.toFixed(2)),
      distance: distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`,
      isOpenNow: place.currentOpeningHours ? place.currentOpeningHours.openNow : null,
      mapsUrl,
      location: {
        lat: gymLat,
        lng: gymLng,
      },
    };
  });
}

/**
 * Fallback: Fetch nearby gyms using legacy Google Places Nearby Search
 */
async function fetchWithLegacyPlacesApi(userLat, userLng, radius, apiKey) {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const response = await axios.get(url, {
    params: {
      location: `${userLat},${userLng}`,
      radius: parseInt(radius, 10),
      type: 'gym',
      key: apiKey,
    },
  });

  const data = response.data;

  if (data.status === 'REQUEST_DENIED') {
    throw new Error(data.error_message || 'Legacy Places API request denied');
  }

  const rawPlaces = data.results || [];

  return rawPlaces.map((place) => {
    const gymLat = place.geometry?.location?.lat;
    const gymLng = place.geometry?.location?.lng;

    let distKm = 0;
    if (gymLat !== undefined && gymLng !== undefined) {
      distKm = calculateHaversineDistance(userLat, userLng, gymLat, gymLng);
    }

    return {
      placeId: place.place_id,
      name: place.name,
      address: place.vicinity || place.formatted_address || 'Address unavailable',
      rating: place.rating || null,
      userRatingsTotal: place.user_ratings_total || 0,
      distanceKm: parseFloat(distKm.toFixed(2)),
      distance: distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`,
      isOpenNow: place.opening_hours ? place.opening_hours.open_now : null,
      mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
      location: {
        lat: gymLat,
        lng: gymLng,
      },
    };
  });
}

/**
 * Controller to fetch nearby gyms
 * GET /api/gyms/nearby?lat=...&lng=...&radius=5000
 */
export async function getNearbyGyms(req, res) {
  const { lat, lng, radius = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      error: 'Missing required query parameters: lat and lng are required.',
    });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid coordinates: lat and lng must be valid numbers.',
    });
  }

  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error:
        'Google Places API key is not configured on the server. Please set GOOGLE_PLACES_API_KEY in backend/.env',
      code: 'MISSING_API_KEY',
    });
  }

  try {
    let gyms = [];

    try {
      // First try the modern Places API (New)
      gyms = await fetchWithPlacesApiNew(userLat, userLng, radius, apiKey);
    } catch (newApiErr) {
      console.warn('[getNearbyGyms] Places API (New) failed, trying legacy API:', newApiErr.message);
      // Fallback to legacy Nearby Search
      gyms = await fetchWithLegacyPlacesApi(userLat, userLng, radius, apiKey);
    }

    // Sort by distance nearest first
    gyms.sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json({
      success: true,
      count: gyms.length,
      userLocation: { lat: userLat, lng: userLng },
      gyms,
    });
  } catch (err) {
    console.error('[getNearbyGyms] Error:', err.message);
    return res.status(500).json({
      success: false,
      error:
        err.response?.data?.error_message ||
        err.response?.data?.error?.message ||
        err.message ||
        'Failed to fetch nearby gyms from Google Places API.',
      code: 'PLACES_API_ERROR',
    });
  }
}

