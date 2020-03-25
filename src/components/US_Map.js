import React, {Component} from 'react';
import {loadModules} from 'esri-loader';
import {getCountyData} from '../services/mapAPIFuncs'

export default class US_Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      counties: [],
    }
  }

  componentDidMount() {
    getCountyData().then(counties => this.setState({counties}))

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/Graphic",
      "esri/widgets/Legend"], {
      css: true,
    }).then(([Map, MapView, FeatureLayer, Graphic, Legend]) => {

      //map is the container, all my layers are added to map
      const map = new Map({
        basemap: 'dark-gray',
      });


      const graphics = this.state.counties.map(point => {
        return new Graphic({
          attributes: {
            ObjectId: point.id,
            country_code: point.country_code,
            country: point.country,
            county: point.county,
            province: point.province,
            last_updated: point.last_updated,
            confirmed_cases: point.confirmed,
            recovered: point.recovered,
            deaths: point.deaths
          },
          geometry: {
            longitude: point.long,
            latitude: point.lat,
            type: "point"
          }
        })
      })

      const featureLayer = new FeatureLayer({
        source: graphics,
        renderer: {
          type: "simple",                    // autocasts as new SimpleRenderer()
          symbol: {                          // autocasts as new SimpleMarkerSymbol()
            type: "simple-marker",
            color: "red",
            outline: {                       // autocasts as new SimpleLineSymbol()
              color: "white",
            },
          },
          visualVariables: [
            {
              type: 'size',
              field: 'confirmed_cases',
              legendOptions: {
                title: "Data provided by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE)"
              },
              stops: [
                {
                  value: 0,
                  size: '0px',
                },
                {
                  value: 1,
                  size: '1px',
                },
                {
                  value: 10,
                  size: '5px',
                },
                {
                  value: 100,
                  size: '10px',
                },
                {
                  value: 1000,
                  size: '25px',
                },
                {
                  value: 10000,
                  size: '50px',
                },
              ],
            },
          ],
        },
        title: "COVID-19 Cases Globally",
        popupTemplate: {                     // autocasts as new PopupTemplate()
          title: "COVID-19",
          content: [{
            type: "fields",
            fieldInfos: [
              {
                fieldName: "country",
                label: "Country",
                visible: true
              },
              {
                fieldName: "county",
                label: "County",
                visible: true
              },
              {
                fieldName: "province",
                label: "Province",
                visible: true
              },
              {
                fieldName: "last_updated",
                label: "Last Updated",
                visible: true
              },
              {
                fieldName: "confirmed_cases",
                label: "Confirmed Cases",
                visible: true
              },
              {
                fieldName: "recovered",
                label: "Recovered",
                visible: true
              },
              {
                fieldName: "deaths",
                label: "Deaths",
                visible: true
              }
            ]
          }]
        },
        objectIdField: "ObjectID",           // This must be defined when creating a layer from `Graphic` objects
        fields: [
          {
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
          },
          {
            name: "country",
            alias: "Country",
            type: "string"
          },
          {
            name: "county",
            alias: "County",
            type: "string"
          },
          {
            name: "province",
            alias: "Province",
            type: "string"
          },
          {
            name: "last_updated",
            alias: "Last Updated",
            type: "string"
          },
          {
            name: "confirmed_cases",
            alias: "Confirmed Cases",
            type: "string"
          },
          {
            name: "recovered",
            alias: "Recovered",
            type: "string"
          },
          {
            name: "deaths",
            alias: "Deaths",
            type: "string"
          }
        ]
      });

      map.add(featureLayer)


      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-98, 36],
        zoom: 3,
      });
    });
  }


  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }


  render() {
    console.log("Zoom Level:", this.state.zoom)
    return (
      //<h1>Map.js is rendering</h1>
      <div className="webmap" ref={this.mapRef} />
    );
  }
}

