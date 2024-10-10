// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','FIREWOOD_QUANTITY', 'FIREWOOD_VALUE', 'FIREWOOD_UNIT_OF_MEASURE'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1')
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");
 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "FIREWOOD_UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'FIREWOOD_QUANTITY');
}
 
// Calculate totals
var totalCCF = calculateTotal('CCF');
var totalCords = calculateTotal('Cords');
var totalACRES = calculateTotal('Acres');
var totalTrees = calculateTotal('Trees');
var totalTons = calculateTotal('Tons');
var totalTrucks = calculateTotal('Trucks')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_firewood_CCF', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_firewood_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_firewood_acres', 'type': 'esriFieldTypeDouble'},
    { 'name': 'total_firewood_trees', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_firewood_tons', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_firewood_trucks', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
   'total_firewood_CCF': totalCCF,
   'total_firewood_cords':totalCords,
   'total_firewood_acres':totalACRES,
   'total_firewood_trees':totalTrees,
   'total_firewood_tons':totalTons,
   'total_firewood_trucks':totalTrucks
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);