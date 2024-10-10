// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','POLE_QUANTITY', 'POLE_VALUE', 'POLE_UNIT_OF_MEASURE'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1');
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");
 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "POLE_UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'POLE_QUANTITY');
}
 
// Calculate totals
var totalAcres = calculateTotal('Acres');
var totalCords = calculateTotal('Cords');
var totalPoles = calculateTotal('Poles');
var totalTrees = calculateTotal('Trees')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_pole_acres', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pole_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pole_poles', 'type': 'esriFieldTypeDouble'},
    { 'name': 'total_pole_trees', 'type': 'esriFieldTypeDouble' },
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
        'total_pole_acres': totalAcres,
        'total_pole_cords': totalCords,
        'total_pole_poles': totalPoles,
        'total_pole_trees': totalTrees
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);