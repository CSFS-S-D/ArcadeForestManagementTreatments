// Set up portal and feature service information
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','POST_QUANTITY', 'POST_VALUE', 'POST_UNIT_OF_MEASURE'], false);
var removed = Filter(fs, 'PRODUCT_REMOVAL = 1')
var statelands = filter(removed, "FUNDING_SOURCE Like '%State%'");
 
// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "POST_UNIT_OF_MEASURE = '" + unit + "'");
    return Sum(filtered, 'POST_QUANTITY');
}
 
// Calculate totals
var totalAcres = calculateTotal('Acres');
var totalCords = calculateTotal('Cords');
var totalPosts = calculateTotal('Posts')
 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'total_posts_acres', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_posts_cords', 'type': 'esriFieldTypeDouble' },
    { 'name': 'total_posts_Posts', 'type': 'esriFieldTypeDouble' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
        'total_posts_acres': totalAcres,
        'total_posts_cords': totalCords,
        'total_posts_Posts': totalPosts
      }
    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);