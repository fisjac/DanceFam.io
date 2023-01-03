import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { getKey } from '../../store/maps';

export default function GoogleMapWrapper (props) {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  const render = (status= Status) => {
    return <h1>{status}</h1>;
  };

  return key && (
    <Wrapper apiKey={key} render={render}>
      {props.children}
    </Wrapper>
  );
};
