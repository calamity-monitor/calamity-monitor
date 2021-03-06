import React, { Component } from "react";
import { loadModules } from "esri-loader";
import { fetchWorldData, fetchUSData } from "../../services/worldMapServices/mapAPIFuncs";
import { covidCasesRenderer, covidDeathsRenderer } from "../../services/worldMapServices/renderer";
import { worldPopupTemplate, usPopupTemplate } from "../../services/worldMapServices/popupTemplate";
import { worldFields, usFields } from "../../services/worldMapServices/fields";
import { covidCasesExpressions } from "../../services/worldMapServices/expressions";
import { covid19ActionSections } from "../../services/worldMapServices/actionSections";

export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      countries: [],
      counties: []
    };
  }

  async componentDidMount() {
    await fetchWorldData().then(countries => this.setState({ countries }));
    await fetchUSData().then(counties => this.setState({ counties }));

    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/widgets/LayerList",
        "esri/core/Collection",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Expand"
      ],
      {
        css: true
      }
    ).then(
      ([Map, MapView, FeatureLayer, Graphic, LayerList, Collection, BasemapToggle, Expand]) => {

        const worldGraphics = this.state.countries.map(point => {
          return new Graphic({
            attributes: {
              ObjectId: point.id,
              country_code: point.country_code,
              country: point.country,
              province: point.province,
              last_updated: point.last_updated,
              confirmed_cases: point.confirmed,
              deaths: point.deaths
            },
            geometry: {
              longitude: point.long,
              latitude: point.lat,
              type: "point"
            }
          });
        });

        const usGraphics = this.state.counties.map(point => {
          return new Graphic({
            attributes: {
              ObjectId: point.id,
              country_code: point.country_code,
              country: point.country,
              state: point.state,
              county: point.county,
              last_updated: point.last_updated,
              confirmed_cases: point.confirmed,
              deaths: point.deaths
            },
            geometry: {
              longitude: point.long,
              latitude: point.lat,
              type: "point"
            }
          });
        });

        const worldCovidCases = new FeatureLayer({
          source: worldGraphics,
          visible: true,
          outFields: ["*"],
          title: "Global COVID-19 Cases",
          renderer: covidCasesRenderer,
          popupTemplate: worldPopupTemplate,
          objectIdField: "ObjectID",
          fields: worldFields
        });

        const worldCovidDeaths = new FeatureLayer({
          source: worldGraphics,
          visible: true,
          outFields: ["*"],
          title: "Global COVID-19 Deaths",
          renderer: covidDeathsRenderer,
          popupTemplate: worldPopupTemplate,
          objectIdField: "ObjectID",
          fields: worldFields
        });

        const usCovidCases = new FeatureLayer({
          source: usGraphics,
          visible: false,
          outFields: ["*"],
          title: "US COVID-19 Cases",
          renderer: covidCasesRenderer,
          popupTemplate: usPopupTemplate,
          objectIdField: "ObjectID",
          fields: usFields
        });

        const usCovidDeaths = new FeatureLayer({
          source: usGraphics,
          visible: false,
          outFields: ["*"],
          title: "US COVID-19 Deaths",
          renderer: covidDeathsRenderer,
          popupTemplate: usPopupTemplate,
          objectIdField: "ObjectID",
          fields: usFields
        });

        const map = new Map({
          basemap: "dark-gray",
          layers: [usCovidCases, usCovidDeaths, worldCovidCases, worldCovidDeaths]
        });

        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          center: [-98, 36],
          constraints: {minZoom: 3}
        });

        const layerList = new LayerList({
          view: this.view,
          listItemCreatedFunction: createActions
        });

        const layerListExpand = new Expand({
          content: layerList
        });
        this.view.ui.add(layerListExpand, "top-right");

        const expressions = new Collection(covidCasesExpressions);

        layerList.on("trigger-action", function(event) {
          const actionId = event.action.id;
          const layer = event.item.layer;
          const subExpression = expressions.find(function(item) {
            return item.id === actionId;
          }).expression;
          const definitionExpression = createDefinitionExpression(subExpression);
          layer.definitionExpression = definitionExpression;
        });

        layerList.statusIndicatorsVisible = false;

        function createActions(event) {
          const item = event.item;
          item.actionsOpen = true;
          item.actionsSections = covid19ActionSections;
        }

        function createDefinitionExpression(subExpression) {
          return subExpression;
        }

        const toggle = new BasemapToggle({
          view: this.view,
          nextBasemap: "gray"
        });
        this.view.ui.add(toggle, "bottom-right");
      }
    );
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap" ref={this.mapRef} theme={"light"}></div>;
  }
}
