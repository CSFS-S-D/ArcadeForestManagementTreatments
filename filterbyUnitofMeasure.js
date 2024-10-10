// This script will filter by the overarching unit of measure not the individual unit of measure.

// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['POLE_QUANTITY', 'OTHER_QUANTITY', 'POST_QUANTITY', 'UNIT_OF_MEASURE','TRANSPLANTS_QUANTITY','FIREWOOD_QUANTITY','SAWLOGS_QUANTITY','POL_QUANTITY'], false);
 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(fs, "UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'POLE_QUANTITY') + Sum(filtered, 'OTHER_QUANTITY') + Sum(filtered, 'POST_QUANTITY') + Sum(filtered, 'TRANSPLANTS_QUANTITY') + Sum(filtered, 'FIREWOOD_QUANTITY') + Sum(filtered, 'SAWLOGS_QUANTITY') + Sum(filtered, 'POL_QUANTITY');
}
 
// Calculate totals
var totalTrees = calculateTotal('trees');
var totalAcres = calculateTotal('acres');
var totalSeedlings = calculateTotal('seedlings');

 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_trees', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_acres', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_seedlings', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
        'total_trees': totalTrees,
        'total_acres': totalAcres,
        'total_seedlings': totalSeedlings
      }

    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);