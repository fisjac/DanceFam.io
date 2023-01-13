import { Autocomplete, useLoadScript } from "@react-google-maps/api";

export default function Places ({apiKey, children}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });
  if (!isLoaded) return <div>Loading...</div>
  const autoComplete = new window.google.maps.places.Autocomplete()
  console.log(autoComplete)

  return children
};
