export interface Properties {
  name: string;
}
export const data: GeoJSON.FeatureCollection<GeoJSON.Point, Properties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.62044324239695, 45.533007663669],
      },
      properties: {
        name: "Merinio (Punch in)",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.61431633188671, 45.53617030519288],
      },
      properties: {
        name: "Havre aux Glaces (Punch out)",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.61484168201937, 45.5358115054582],
      },
      properties: {
        name: "Marché Jean Talon",
      },
    },
  ],
};

export const merinio = {
  longitude: -73.62054376278073,
  latitude: 45.532898720734494,
  zoom: 17.5,
};

export const marchePoly = {
  type: "Feature",
  properties: {
    name: "Marché Jean Talon",
  },
  geometry: {
    coordinates: [
      [
        [-73.61505018258964, 45.53691513798867],
        [-73.61636557153122, 45.53548865602119],
        [-73.61463054782122, 45.534707872927726],
        [-73.61331779250754, 45.53612961078025],
        [-73.61505018258964, 45.53691513798867],
      ],
    ],
    type: "Polygon",
  },
};

export const marcheJeanTalon = [-73.61484168201937, 45.5358115054582];
