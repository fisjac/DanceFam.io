

export const attachAutoComplete = (autoCompleteRef, inputRef) => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    inputRef.current,
    {
      fields: ["name", "address_components", "geometry","url"],
      types: ["establishment"]
    }
  );
}

export const parsePlaceData = (data) => {
  const location = data.geometry.location.toJSON();
  let name = data.name;
  let url = data.url;
  let components = {};
  data.address_components.forEach((component) => {
  component.types.forEach((type) => {
    components[type] = component.long_name;
  });
});
  return {name, url, location, components};
}
