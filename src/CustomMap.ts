// Instructions to every other class
// on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(
    // set defaults : zoom , center of the map
    divId: string,
    lat: number = 0,
    lng: number = 0,
    zoom: number = 2
  ) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: zoom,
      center: {
        lat: lat,
        lng: lng,
      },
    });
  }
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });
    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
