// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','OTHER_QUANTITY', 'OTHER_VALUE', 'OTHER_UNIT_OF_MEASURE'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1')
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");
 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "OTHER_UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'OTHER_QUANTITY');
}
 
// Calculate totals
var totalCCF = calculateTotal('CCF');
var totalCords = calculateTotal('Cords');
var totalFeet = calculateTotal('Linear Feet');
var totalTrees = calculateTotal('Trees');
var totalTons = calculateTotal('Tons');
var totalTrucks = calculateTotal('Trucks')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_other_CCF', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_other_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_other_feet', 'type': 'esriFieldTypeDouble'},
    { 'name': 'total_other_trees', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_other_tons', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_other_trucks', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
   'total_other_CCF': totalCCF,
   'total_other_cords':totalCords,
   'total_other_feet':totalFeet,
   'total_other_trees':totalTrees,
   'total_other_tons':totalTons,
   'total_other_trucks':totalTrucks
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);