// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','POL_QUANTITY', 'POL_VALUE', 'POL_UOM'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1');
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");

 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "POL_UOM = '" + unit + "'");
    return Sum(filtered, 'POL_QUANTITY');
}
 
// Calculate totals
var totalCCF = calculateTotal('CCF');
var totalCords = calculateTotal('Cords');
var totalTrees = calculateTotal('Trees');
var totalTons = calculateTotal('Tons');
var totalTrucks = calculateTotal('Trucks')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_pol_CCF', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pol_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pol_trees', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pol_tons', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_pol_trucks', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
   'total_pol_CCF': totalCCF,
   'total_pol_cords':totalCords,
   'total_pol_trees':totalTrees,
   'total_pol_tons':totalTons,
   'total_pol_trucks':totalTrucks
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);