// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','SAWLOGS_QUANTITY', 'SAWLOGS_VALUE', 'SAWLOGS_UNIT_OF_MEASURE'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1')
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");

// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "SAWLOGS_UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'SAWLOGS_QUANTITY');
}
 
// Calculate totals
var totalCCF = calculateTotal('CCF');
var totalCords = calculateTotal('Cords');
var totalpoles = calculateTotal('Poles');
var totalTrees = calculateTotal('Trees');
var totalTons = calculateTotal('Tons');
var totalMBF = calculateTotal('MBF');
var totalAcres = calculateTotal('Acres');
var totalTrucks = calculateTotal('Trucks')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_sawlogs_CCF', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_poles', 'type': 'esriFieldTypeDouble'},
    { 'name': 'total_sawlogs_trees', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_tons', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_MBF', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_acres', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_sawlogs_trucks', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
   'total_sawlogs_CCF': totalCCF,
   'total_sawlogs_cords':totalCords,
   'total_sawlogs_poles':totalpoles,
   'total_sawlogs_trees':totalTrees,
   'total_sawlogs_tons':totalTons,
   'total_sawlogs_acres':totalAcres,
   'total_sawlogs_MBF':totalMBF,
   'total_sawlogs_trucks':totalTrucks
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);