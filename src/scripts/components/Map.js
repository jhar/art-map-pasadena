import React, { Component } from 'react'

const icon_1 = {
    url: 'images/a1s.png',
    scaledSize: new google.maps.Size(67, 67),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
}

const icon_2 = {
    url: 'images/a2s.png',
    scaledSize: new google.maps.Size(67, 67),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
}

const map_style = [{
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{ "color": "#e4d7b6" }]
}, {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{ "gamma": 0.01 }, { "lightness": 20 }]
}, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{ "saturation": -31 }, { "lightness": -33 }, { "weight": 2 }, { "gamma": 0.8 }]
}, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
}, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{ "visibility": "simplified" }]
}, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "lightness": 30 }, { "saturation": 30 }]
}, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "saturation": 20 }]
}, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#595959" }]
}, {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#595959" }, { "visibility": "simplified" }]
}, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "lightness": 20 }, { "saturation": -20 }]
}, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "lightness": 10 }, { "saturation": -30 }]
}, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }]
}, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{ "saturation": 25 }, { "lightness": 25 }]
}, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#595959"}, { "weight": "1.00" }]
}, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{ "visibility": "simplified" }]
}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{ "lightness": -20 }]
}, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#d1f4ef" }, { "visibility": "on" }]
}]

let map = null

export default class Map extends Component {
    componentWillReceiveProps(nextProps) {
        // Change all marker icons to icon_1, unless marker is active
        for (let marker of this.state.markers) {
            if (marker.index === nextProps.active) {
                marker.setIcon(icon_2)
                // Center map on selected marker
                if (nextProps.showInfo === true) {
                    this.offCenterMap(marker)
                } else {
                    map.setCenter(marker.getPosition())
                }
            } else {
                marker.setIcon(icon_1)
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
            center: { lat: 34.151389, lng: -118.150281 },
            mapTypeControl: false,
            zoom: 14
        })
        map.setOptions({
            styles: map_style
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
                icon: icon_1,
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
        let ne = map.getBounds().getNorthEast()
        let sw = map.getBounds().getSouthWest()
        let mapRange = ne.lng() - sw.lng()
        let infoWidth = document.getElementsByClassName('info-view')[0].offsetWidth
        let screenWidth = window.innerWidth
        let infoLng = (mapRange * infoWidth)/screenWidth
        let absLng = (mapRange - infoLng)/2
        let markerPos = marker.getPosition()
        let newLng = markerPos.lng() - mapRange/2 + absLng
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
