import React, { Component } from 'react'
import { WIDTH, HEIGHT, URL_1, URL_2, LAT, LNG, ZOOM } from './constants.js'
import { STYLE }from './style.js'
import './style.css'

let map = null

export default class Map extends Component {
  componentWillReceiveProps(nextProps) {
    // Change all marker icons to icon 1, unless marker is active
    for (let marker of this.state.markers) {
      if (marker.index === nextProps.active) {
        marker.setIcon({
          url: URL_2,
          scaledSize: new google.maps.Size(WIDTH, HEIGHT),
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
          url: URL_1,
          scaledSize: new google.maps.Size(WIDTH, HEIGHT),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        })
      }
      // Set visibility
      marker.setVisible(nextProps.locations[marker.index].visibility)
    }
    // Recenter on middle if no active marker
    if (nextProps.active === null && this.props.active !== null) {
      map.setCenter(this.state.markers[this.props.active].getPosition())
    }
  }

  createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: LAT,
        lng: LNG
      },
      mapTypeControl: false,
      zoom: ZOOM
    })
    map.setOptions({
      styles: STYLE
    })
  }

  createMarkers(locations) {
    let newMarkers = []
    let index = 0
    for (let location of locations) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[index].lat, locations[index].lng),
        map: map,
        title: locations[index].name,
        icon: {
          url: URL_1,
          scaledSize: new google.maps.Size(WIDTH, HEIGHT),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
        },
        index: index,
        active: false
      })
      google.maps.event.addListener(marker, 'click', event => {
        this.props.selectActive(marker.index)
      })
      index++
      newMarkers.push(marker)
    }
    this.setState({ markers: newMarkers })
  }

  componentDidMount() {
    this.createMap()
    this.createMarkers(this.props.locations)
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
