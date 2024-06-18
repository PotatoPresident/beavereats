import { Loader } from '@googlemaps/js-api-loader'
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

export default function Map({ state }) {
  const [selectedLocation, setSelectedLocation] = state
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: 'weekly'
  })
  
  const CORVALLIS_BOUNDS = {
    north: 44.570405,
    south: 44.555351,
    west: -123.294775,
    east: -123.267350,
  }
  
  const CORVALLIS = { lat: 44.564341, lng: -123.280790 }
  
  loader.load().then(async () => {
    const locations = await (await fetch('/api/locations', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })).json()

    const { Map } = await google.maps.importLibrary('maps')

    const map = new Map(document.getElementById('map'), {
      mapId: 'b136f702a28f987e',
      center: CORVALLIS,
      restriction: {
        latLngBounds: CORVALLIS_BOUNDS,
        strictBounds: false,
      },
      minZoom: 16.75,
      zoom: 16.75,
      disableDefaultUI: true,
    })


    const markers = []
    locations.map((group) => {
      group.options.map((option) => {
        const marker = new MarkerWithLabel({
          map: map,
          position: {lat: option.lat, lng: option.lng},
          labelContent: option.displayName, // can also be HTMLElement
          labelAnchor: new google.maps.Point(-21, 3),
          labelClass: "labels", // the CSS class for the label
      })
        marker.addListener('click', () => {
          setSelectedLocation(option.group)
          const clickedMarkerCoords = {lat: option.lat, lng: option.lng}
          map.panTo(clickedMarkerCoords)
          console.log('map paned to ' + clickedMarkerCoords)
        })
        switch (selectedLocation) {
          case 'McNary':
            map.panTo({ lat: 44.56412339072111, lng: -123.27237759512379 })
            map.setZoom(18)
            break
          case 'Arnold':
            map.panTo({ lat: 44.56045267241557, lng: -123.27759333004018 })
            map.setZoom(18)
            break
          case 'West':
            map.panTo({ lat: 44.56390497552497, lng: -123.2835802319097 })
            map.setZoom(18)
            break
          case 'MU':
            map.panTo({ lat: 44.5649206643527, lng: -123.2789069030742 })
            map.setZoom(18)
            break
          case 'Other':
            map.panTo({ lat: 44.5649206643527, lng: -123.2789069030742 })
            map.setZoom(16.75)
            break
        }
        markers.push(marker)
      })
    })
  })

  return <div id='map' className='h-screen w-full'></div>
}