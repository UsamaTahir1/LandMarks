import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import RemarkComponent from './RemarkComponent';
import { landmarkActions } from '../../_actions';
import { landmarkService } from '../../_services';
import {config} from '../../_helpers/config'
const AnyReactComponent = ({  img_src }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{}} /></div>;
class MapSettings{
  constructor()
  {
      this.centerCoordinates = {lat: -7.319500, lng: 72.422859};
      this.defaultUserCoordinates = {lat: -7.319500, lng: 72.422859};
  }
}
const mapSettings = new MapSettings();
export default mapSettings;

class MyGoogleMapClass extends Component {
  constructor(props){
    super(props);
    this.currentOpenRemarkWindow = null;
    this.mapReference = null;
  this.props.dispatch(landmarkActions.getAllLandmarks()).then(()=>{
    this.loadUserLandmarks(this.mapReference)
 });   
     
     this.state = {
      query: "",
      gloablLandMarks : [],
      globalMarkers: []
    }
  }
  searchByText() {
    var queryText = this.state.query;//event.target.value;
    
    let filteredMarkers = [];
    this.state.globalMarkers.map((landmark) => {
      let addIt = false;
      for (let i = 0; i < landmark.otherNotes.length; i++) {
        let element = landmark.otherNotes[i];
        if(element.text.toLowerCase().indexOf(queryText)!=-1 || element.userName.toLowerCase().indexOf(queryText)!=-1)
        {
          addIt = true;
          break;
        }
      }
      if(addIt){filteredMarkers.push(landmark);addIt = false;}
    });
    if(filteredMarkers.length > 0){
      this.clearMarkers();
      this.loadFilteredLandmarks(this.mapReference,filteredMarkers);
    }
    //this.setState({globalMarkers: filteredMarkers});
    //this.props.SearchItems(this.state);
  }
  resetMarkers(){
    this.showMarkers();
  }

  loadUserLandmarks(map) {
    if(this.props.state.landmarks && this.props.state.landmarks.allLandMarks){
      this.setState({globalMarkers: this.props.state.landmarks.allLandMarks});

        this.state.globalMarkers.map((landMark) => 
        this.loadMapMarker(map, landMark, false,true)
      );
    //}
  }
    //Gets the users current location,
    findUserCurrentGeolocation(this.markUserCurrentLocation.bind(this, map), this.markUserCurrentLocation.bind(this, map, mapSettings.defaultUserCoordinates));
}
loadFilteredLandmarks(map,landmarks) {
      landmarks.map((landMark) => 
        this.loadMapMarker(map, landMark, false,false)
    );
}
 setMapOnAll(map) {
      this.state.gloablLandMarks.map((marker) => 
      marker.setMap(map));
}

// Removes the markers from the map, but keeps them in the array.
clearMarkers() {
  this.setMapOnAll(null);
}

// Shows any markers currently in the array.
showMarkers() {
  this.setMapOnAll(this.mapReference);
}

/**
 * @desc Marks users current location
 * @param <GoogleMap> map
 * @param <GeoLocation> position
 */
markUserCurrentLocation(map, position) {
    const coordinates = position.coords;
    //this.createMapLandMark({lat: coordinates.latitude, lng: coordinates.longitude}, map);
    map.panTo({lat: coordinates.latitude, lng: coordinates.longitude});  
    console.log(this.props);      
}
createNewLandMark(obj,map){
    this.createMapLandMark({lat: obj.latLng.lat(), lng: obj.latLng.lng()}, this.mapReference);
}
loadMapMarker(map, landMark, isNewLandmark,updateState) {
  var lat = landMark.latitude;
  var lng = landMark.longitude;
  const marker = new google.maps.Marker({
      position: {lat: landMark.latitude, lng: landMark.longitude}
  });
  this.addLandMarkRemark(map, marker, landMark, isNewLandmark);
  marker.setMap(map);
  if(updateState){
    let offset = this.state.gloablLandMarks;
    offset.push(marker);
    this.setState({gloablLandMarks: offset});
  }
}
loadMapEvents(element) {
  element.addListener('click', (e) => {
      //Google maps even object with functions for extracting latitude and longitude
      const eventLatLng = e.latLng;

    console.log("The marker that was clicked is", element);
  });
}




addLandMarkRemark(map, marker, landMark, isEditMode) {
  //Create remark component
  const remarkComponent = new RemarkComponent(landMark.userNote, isEditMode,landMark);
  //Create remark window
  const infowindow = new google.maps.InfoWindow({
      content: remarkComponent.element
  });
  //If is a new remark and thus in edit mode
  if (isEditMode) {
      //Set current open remark window
      this.currentOpenRemarkWindow = infowindow;
      //Open the remark window
      this.openCurrentOpenRemarkWindow(map, marker);
  }
  //Add google map event listeners
  this.addLandMarkEvents(map, infowindow, remarkComponent, marker, landMark)
}

/**
* @desc Adds events to google map components
* @param <GoogleMap> map
* @param <InfoWindow> infowindow
* @param <RemarkComponent> remarkComponent
* @param <GoogleMapMarker> marker
* @param <LandMark> landMark
*/
addLandMarkEvents(map, infowindow, remarkComponent, marker, landMark) {
  const {dispatch, actions} = this.props;
  const googleMapsApi = google.maps;
  //Add listener for closing of the InfoWindow
  infowindow.addListener('closeclick', () => {
      //Reset the open remark window
      this.currentOpenRemarkWindow = null;
  });
  marker.addListener('click', () => {
      //Close other previously open remark window
      this.closeCurrentOpenRemarkWindow();

      //Set currently open remark window
      this.currentOpenRemarkWindow = infowindow;

      //Open the current
      this.openCurrentOpenRemarkWindow(map, marker);

  });

  //Save the remark text for the landmark
  googleMapsApi.event.addDomListener(remarkComponent.btnSaveRemarkElement, "click", () => {
      remarkComponent.setRemarkText();
      //Dispatch update landmark remark update action
      dispatch(landmarkActions.updateRemark(landMark.id, remarkComponent.getRemarkText()));
  });
}

/**
* @desc Creates a new landmark with an empty remark
* @param <Object{lat: Decimal, lng: Decimal }> latitudeLongitudeSettings
* @param <GoogleMap> map
*/
createMapLandMark({lat, lng}, map) {
  //Set model service and event dispatch object
  const {modelFactory, dispatch, actions} = this.props;
  //Close other previously open remark window
  this.closeCurrentOpenRemarkWindow();
  //Create new landmark
  const landMark = modelFactory.createLandMark({
      longitude: lng,
      latitude: lat,
      hasFocus: true,
  });
  //Focus map over landmark location
  map.panTo({lat, lng});
  //Load landmark and remark to google map
  this.loadMapMarker(map, landMark, true);
  dispatch(landmarkActions.createLandMark(landMark));
}

/**
* @desc Opens the landmark Remark Display Window
* @param <GoogleMap> map
* @param <GoogleMapMarker> marker
*/
openCurrentOpenRemarkWindow(map, marker) {
  if (this.currentOpenRemarkWindow) {
      this.currentOpenRemarkWindow.open(map, marker);
  }
}

/**
* @desc Close the landmark Remark Display Window
*/
closeCurrentOpenRemarkWindow() {
  if (this.currentOpenRemarkWindow) {
      this.currentOpenRemarkWindow.close();
      this.currentOpenRemarkWindow = null;
  }
}
loadMapInComponent(map,maps){
  this.mapReference = map;
  this.loadUserLandmarks(this.mapReference);
  maps.event.addListener(map,'click',(event)=>{
    this.createNewLandMark(event);
  });
}
  render() {
     return (
       <div>
       <GoogleMapReact
       bootstrapURLKeys={{
        v: '3.exp', key: config.mapkey,language: 'en'
      }}
         defaultCenter={this.props.center}
         defaultZoom={this.props.zoom}
         style={{height: '70vh'}}
         onGoogleApiLoaded={({map, maps}) => this.loadMapInComponent(map,maps)}
       >
       </GoogleMapReact>    
       <div className="col-md-12 pull-left">
              <div className="form-group form-control-by-1">
                <input type="text" className="form-control-search search-input-box" id="name" name="name" value={this.state.name} 
                onChange={event => {
                  this.setState({query: event.target.value});
                  
                if(event.target.value == "")
                {this.resetMarkers()}
                
              }} onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.searchByText()
                }
              }} placeholder="Search "/>
              </div>
            </div>
</div>         
     );
   }
}
MyGoogleMapClass.defaultProps = {
  center: {lat: 59.95, lng: 30.33},
  zoom: 11
};
export const findUserCurrentGeolocation = (success, error) => {
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(success, error);
  } else {
      error.call();
  }
};
function mapStateToProps(state) {
  const { landMarks } = state;
  return {
      state
  };
}

const connectedApp = connect(mapStateToProps)(MyGoogleMapClass);
export { connectedApp as MyGoogleMapClass };