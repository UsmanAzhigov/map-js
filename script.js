const realEstateData = [
  { lat: 40.7128, lng: -74.006, type: 'primary' },
  { lat: 34.0522, lng: -118.2437, type: 'secondary' },
];

let markers = [];

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });

  const propertyList = document.getElementById('property-list');
  const filterType = document.getElementById('filter-type');

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['rectangle'],
    },
  });
  drawingManager.setMap(map);

  realEstateData.forEach((item) => {
    const marker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map,
      label: item.type.toUpperCase()[0],
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>Type:</strong> ${item.type}<br><strong>Lat:</strong> ${item.lat}<br><strong>Lng:</strong> ${item.lng}`,
      });
      infoWindow.open(map, marker);
    });

    const listItem = document.createElement('div');
    listItem.textContent = `Type: ${item.type}`;
    listItem.addEventListener('click', () => {
      google.maps.event.trigger(marker, 'click');
    });
    propertyList.appendChild(listItem);

    markers.push(marker);
  });

  filterType.addEventListener('change', () => {
    const filteredData = filterRealEstateByType(filterType.value);
    updatePropertyList(filteredData);
  });
}

function filterRealEstateByType(type) {
  return type ? realEstateData.filter((item) => item.type === type) : realEstateData;
}

function updatePropertyList(data) {
  const propertyList = document.getElementById('property-list');
  propertyList.innerHTML = '';

  data.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.textContent = `Type: ${item.type}`;
    listItem.addEventListener('click', () => {
      const index = realEstateData.indexOf(item);
      google.maps.event.trigger(markers[index], 'click');
    });
    propertyList.appendChild(listItem);
  });
}
