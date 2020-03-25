import React, {Component} from 'react';
import {loadModules} from 'esri-loader';
import { getCoordinateData } from '../services/mapAPIFuncs'

export default class World_Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      countries: []
    };
  }

  componentDidMount() {

    getCoordinateData().then(countries => this.setState({countries}))

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/widgets/LayerList",
        "esri/core/Collection",
        "esri/widgets/BasemapToggle"
      ],
      {
        css: true
      }
    ).then(([Map, MapView, FeatureLayer, Graphic, LayerList, Collection, BasemapToggle]) => {

      //map is the container, all my layers are added to map
      const map = new Map({
        basemap: "dark-gray"
      });

      const graphics = this.state.countries.map(point => {
        return new Graphic({
          attributes: {
            ObjectId: point.id,
            country_code: point.country_code,
            country: point.country,
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
        });
      });

      const featureLayer = new FeatureLayer({
        source: graphics,
        outFields: ["*"],
        title: "COVID-19 Cases Globally",
        renderer: {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
            // autocasts as new SimpleMarkerSymbol()
            type: "simple-marker",
            color: "red",
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: "white"
            }
          },
          visualVariables: [
            {
              type: "size",
              field: "confirmed_cases",
              stops: [
                {
                  value: 0,
                  size: "0px"
                },
                {
                  value: 1,
                  size: "1px"
                },
                {
                  value: 101,
                  size: "5px"
                },
                {
                  value: 1001,
                  size: "10px"
                },
                {
                  value: 10001,
                  size: "25px"
                },
                {
                  value: 50001,
                  size: "50px"
                }
              ]
            },
            {
              type: "opacity",
              field: "confirmed_cases",
              stops: [
                {
                  value: 0,
                  opacity: 0.4
                }
              ]
            }
          ]
        },
        popupTemplate: {
          // autocasts as new PopupTemplate()
          title: "COVID-19",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "country",
                  label: "Country",
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
            }
          ]
        },
        objectIdField: "ObjectID", // This must be defined when creating a layer from `Graphic` objects
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

      map.add(featureLayer);

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-98, 36],
        zoom: 3
      });

      const layerList = new LayerList({
        view: this.view,
        listItemCreatedFunction: createActions
      });
      this.view.ui.add(layerList, "top-right");

      const expressions = new Collection([
        {
          id: "All",
          expression: "confirmed_cases > 0"
        },
        {
          id: "50,000+",
          expression: "confirmed_cases > 50000"
        },
        {
          id: "10,000-50,000",
          expression: "confirmed_cases > 10000 AND confirmed_cases <= 50000"
        },
        {
          id: "1,000-10,000",
          expression: "confirmed_cases > 1000 AND confirmed_cases <= 10000"
        },
        {
          id: "100-1,000",
          expression: "confirmed_cases > 100 AND confirmed_cases <= 1000"
        },
        {
          id: "1-100",
          expression: "confirmed_cases > 10 AND confirmed_cases <= 100"
        }
      ]);

      layerList.on("trigger-action", function(event) {
        const actionId = event.action.id;
        const layer = event.item.layer;

        const subExpression = expressions.find(function(item) {
          return item.id === actionId;
        }).expression;

        const definitionExpression = createDefinitionExpression(subExpression);
        layer.definitionExpression = definitionExpression;

        zoomToLayer(layer);
      });

      function createActions(event) {
        const item = event.item;

        item.actionsOpen = true;
        item.actionsSections = [
          [
            {
              title: "All Cases",
              className: "esri-icon-zoom-out-fixed",
              id: "All",
            },
            {
              title: "50,000+",
              className: "esri-icon-zoom-out-fixed",
              id: "50,000+",
            },
            {
              title: "10,000-50,000",
              className: "esri-icon-zoom-out-fixed",
              id: "10,000-50,000",
            },
            {
              title: "1,000-10,000",
              className: "esri-icon-zoom-out-fixed",
              id: "1,000-10,000",
            },
            {
              title: "100-1,000",
              className: "esri-icon-zoom-out-fixed",
              id: "100-1,000"
            },
            {
              title: "1-100",
              className: "esri-icon-zoom-out-fixed",
              id: "1-100"
            }
          ],
        ];
      }

      function createDefinitionExpression(subExpression) {


        return subExpression
      }

      // Zooms to the extent of the layer as defined by
      // its definitionExpression
      // This method will work for all FeatureLayers, even
      // those without a saved `fullExtent` on the service.

      function zoomToLayer(layer) {
        return layer.queryExtent().then(function(response) {
          this.view.goTo(response.extent);
        });
      }

      const toggle = new BasemapToggle({
        view: this.view,
        nextBasemap: "gray"
      })
      this.view.ui.add(toggle, "bottom-right")
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    );
  }
}
