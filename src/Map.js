import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let config = {};
config.params = {
  center: [43.0528803, -87.8982555],
  zoomControl: false,
  zoom: 16,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};

// https://wiki.openstreetmap.org/wiki/Tile_servers
// http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.jpg
// uri: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
// uri: 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
// var tileServer = "http://tile.thunderforest.com/transport/{z}/{x}/{y}.png"

var tileServer = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png	"

config.tileLayer = {
  uri: tileServer,
  params: {
    minZoom: 11,
    id: '',
    accessToken: 'tYoT6hJoXvI7yTSWL1nWsYEaVOB3b7C5'
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      numEntrances: null
    };
    this._mapNode = null;
  }

  componentDidMount() {
    if (!this.state.map) this.init(this._mapNode);
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  init(id) {
    if (this.state.map) return;
    let map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
    this.setState({ map, tileLayer });
  }

  render() {
    return (
      <div id="mapUI">
        <div ref={(node) => {this._mapNode = node}} id="map" />
      </div>
    );
  }
}

export default Map;
