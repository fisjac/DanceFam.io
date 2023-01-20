

export const attachAutoComplete = (autoCompleteRef, inputRef) => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    inputRef.current,
    {
      fields: ["address_components", "geometry"],
      types: ["establishment"]
    }
  );
}

export const parsePlaceData = (data) => {
  const location = data.geometry.location.toJSON()
  let components = {};
  data.address_components.forEach((component) => {
  component.types.forEach((type) => {
    components[type] = component.long_name;
  });
});
  return {location, components};
}
