import React, {useState, useEffect, useContext, Children, useRef} from 'react'
import {createPortal} from 'react-dom'
import { GoogleMapsMapContext } from './MapsLoader';


export default function CustomInfoWindow({
  children,
  anchor,
  options,
  position,
  zIndex,
  onCloseClick,
  onDomReady,
  onContentChanged,
  onPositionChanged,
  onZindexChanged,
  onLoad,
  onUnmount
  }) {

  const [instance, setInstance] = useState(null);
  const [closeclickListener, setCloseClickListener] = useState(null)
  const [domreadyclickListener, setDomReadyClickListener] = useState(null)
  const [contentchangedclickListener, setContentChangedClickListener] = useState(null)
  const [positionchangedclickListener, setPositionChangedClickListener] = useState(null)
  const [zindexchangedclickListener, setZindexChangedClickListener] = useState(null)
  const containerElementRef = useRef(null);
  const {map} = useContext(GoogleMapsMapContext);

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        window.google.maps.event.removeListener(zindexchangedclickListener)
      }

      setZindexChangedClickListener(
        window.google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged)
      )
    }
  }, [onZindexChanged])

  useEffect(() => {
    const infoWindow = new window.google.maps.InfoWindow({
      ...(options || {}),
    })

    setInstance(infoWindow)

    containerElementRef.current = document.createElement('div')

    if (onCloseClick) {
      setCloseClickListener(
        window.google.maps.event.addListener(infoWindow, 'closeclick', onCloseClick)
      )
    }

    if (onDomReady) {
      setDomReadyClickListener(
        window.google.maps.event.addListener(infoWindow, 'domready', onDomReady)
      )
    }

    if (onContentChanged) {
      setContentChangedClickListener(
        window.google.maps.event.addListener(infoWindow, 'content_changed', onContentChanged)
      )
    }

    if (onPositionChanged) {
      setPositionChangedClickListener(
        window.google.maps.event.addListener(infoWindow, 'position_changed', onPositionChanged)
      )
    }

    if (onZindexChanged) {
      setZindexChangedClickListener(
        window.google.maps.event.addListener(infoWindow, 'zindex_changed', onZindexChanged)
      )
    }

    infoWindow.setContent(containerElementRef.current)

    if (position) {
      infoWindow.setPosition(position)
    }

    if (zIndex) {
      infoWindow.setZIndex(zIndex)
    }

    if (anchor) {
      infoWindow.open({map, anchor,'shouldFocus':false})
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map)
    } else {
      console.error(`You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`)
    }

    if (onLoad) {
      onLoad(infoWindow)
    }

    return () => {
      if (closeclickListener) {
        window.google.maps.event.removeListener(closeclickListener)
      }

      if (contentchangedclickListener) {
        window.google.maps.event.removeListener(contentchangedclickListener)
      }

      if (domreadyclickListener) {
        window.google.maps.event.removeListener(domreadyclickListener)
      }

      if (positionchangedclickListener) {
        window.google.maps.event.removeListener(positionchangedclickListener)
      }

      if (zindexchangedclickListener) {
        window.google.maps.event.removeListener(zindexchangedclickListener)
      }

      if (onUnmount) {
        onUnmount(infoWindow)
      }

      infoWindow.close()
    }
  }, [])



  if (!containerElementRef.current) return null
  return createPortal(Children.only(children), containerElementRef.current)
}
