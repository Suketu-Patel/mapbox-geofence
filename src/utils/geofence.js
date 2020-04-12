const geofence = (lat1,lat2,lon1,lon2)=>{
    //eslint-disable-next-line
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
     }
     let R = 6371; // km 
     //has a problem with the .toRad() method below.
     let x1 = lat2-lat1;
     let dLat = x1.toRad();  
     let x2 = lon2-lon1;
     let dLon = x2.toRad();
     let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                     Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                     Math.sin(dLon/2) * Math.sin(dLon/2);  
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     let d = R * c; 
     console.log(d)
     return d
}
export default geofence;