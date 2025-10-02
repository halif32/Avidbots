import { Location } from 'contexts/LocationContext';

export const calculateDistance = (lat1: number,lon1: number,lat2: number,lon2: number): number => {
	const R = 6371; // Earth's radius in kilometers
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance: number = R * c;
	return distance;
};

export const getNearestFacility = (locationsData: Location[] ,coordinates: { lat: number; long: number }) => {
	let facilityWithMinDistance:Location = {label:'',value:'',lat:0,long:0};
	const facilitiesWithDistance = locationsData
		.map((facility: any) => {
			const distance = calculateDistance(coordinates?.lat,coordinates?.long,facility?.lat,facility?.long);
			return { ...facility, distance };
		});


	if (facilitiesWithDistance.length > 0) {
		facilityWithMinDistance = facilitiesWithDistance.reduce(
			(minFacility, facility) => {
				if (typeof facility?.distance == 'number' && typeof minFacility?.distance == 'number') {
					if (facility?.distance < minFacility?.distance) {
						return facility;
					}
					return minFacility;
				}
			},
			facilitiesWithDistance[0]
		);
	}

	return facilityWithMinDistance;
};
