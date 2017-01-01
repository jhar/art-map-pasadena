import React, { Component, PropTypes } from 'react'
import { MARKER_1, MARKER_2 } from '../constants/images'
import { CUSTOM_MAP } from '../constants/customMap.js'
import '../css/map.css'

let map = null

export default class Map extends Component {
  componentWillReceiveProps(nextProps) {
    // Change all marker icons to icon 1, unless marker is active
    for (let marker of this.state.markers) {
      if (marker.index === nextProps.active) {
        marker.setIcon({
          url: MARKER_2,
          scaledSize: new google.maps.Size(67, 67),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        })
        // Center map on selected marker
        if (nextProps.infShow === true) {
          this.offCenterMap(marker)
        } else {
          map.setCenter(marker.getPosition())
        }
      } else {
        marker.setIcon({
          url: MARKER_1,
          scaledSize: new google.maps.Size(67, 67),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        })
      }
      // Set visibility
      marker.setVisible(nextProps.places[marker.index].visibility)
    }
    // Recenter on middle if no active marker
    if (nextProps.active === null && this.props.active !== null) {
      map.setCenter(this.state.markers[this.props.active].getPosition())
    }
  }

  createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 34.151389,
        lng: -118.150281
      },
      mapTypeControl: false,
      zoom: 14
    })
    map.setOptions({
      styles: CUSTOM_MAP
    })
  }

  createMarkers(places) {
    let newMarkers = []
    let i = 0
    for (let place of places) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(places[i].location.latitude, places[i].location.longitude),
        map: map,
        title: places[i].name,
        icon: {
          url: MARKER_1,
          scaledSize: new google.maps.Size(67, 67),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        },
        index: i,
        active: false
      })
      google.maps.event.addListener(marker, 'click', event => {
        this.props.selectActive(marker.index)
      })
      i++
      newMarkers.push(marker)
    }
    this.setState({ markers: newMarkers })
  }

  componentDidMount() {
    this.createMap()
    this.createMarkers(this.props.places)
  }

  offCenterMap(marker) {
    const ne = map.getBounds().getNorthEast()
    const sw = map.getBounds().getSouthWest()
    const mapRange = ne.lng() - sw.lng()
    const infW = document.getElementsByClassName('info-view')[0].offsetWidth
    const infLng = (mapRange * infW)/window.innerWidth
    const absLng = (mapRange - infLng)/2
    const markerPos = marker.getPosition()
    const newLng = markerPos.lng() - mapRange/2 + absLng
    map.setCenter(new google.maps.LatLng(markerPos.lat(), newLng))
  }

	render() {
		return (
			<section className="map-view">
				<div id="map"></div>
			</section>
		)
	}
}
