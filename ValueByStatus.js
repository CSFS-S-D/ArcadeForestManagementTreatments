// Set up portal and feature service informationPOLE_QUANTITY
var p = 'https://csfs.maps.arcgis.com/';
var itemId = 'e875b7ce36764406b10aaf2a6a2dc2cc';
var fs = FeatureSetByPortalItem(Portal(p), itemId, 0, ['FUNDING_SOURCE','STATUS','POLE_VALUE', 'OTHER_VALUE', 'POST_VALUE', 'UNIT_OF_MEASURE','TRANSPLANT_VALUE','FIREWOOD_FIREWOOD_VALUE','SAWLOGS_VALUE','POL_VALUE'], false);

// Filter the FeatureSet for "State Trust" in the FUNDING_SOURCE field using Includes
//var statelands = Filter(fs,"FUNDING_SOURCE = 'State Trust Lands'")
var statelands = filter(fs, "FUNDING_SOURCE Like '%State%'");
//var statelands = Filter(fs, Includes('FUNDING_SOURCE', 'State Trust'))


// Function to calculate total for a unit of measure
function calculateTotal(unit) {
    var filtered = Filter(statelands, "STATUS = '" + unit + "'");   //var filtered = Filter(removed, "POL_UOM = '" + unit + "'");
    return Sum(filtered, 'POLE_VALUE') + Sum(filtered, 'OTHER_VALUE') + Sum(filtered, 'POST_VALUE') + Sum(filtered, 'TRANSPLANT_VALUE') + Sum(filtered, 'FIREWOOD_FIREWOOD_VALUE') + Sum(filtered, 'SAWLOGS_VALUE') + Sum(filtered, 'POL_VALUE');
}
 
// Calculate totals
var progress = calculateTotal('inprogress');
var completed = calculateTotal('completed');
var planned = calculateTotal('planned');

 
// Create a dictionary to store the values
var StorageDict = {
  'fields': [
    { 'name': 'In_Progress', 'type': 'esriFieldTypeInteger' },
    { 'name': 'Completed', 'type': 'esriFieldTypeInteger' },
    { 'name': 'Planned', 'type': 'esriFieldTypeInteger' }
  ],
  'geometryType': '',
  'features': [
    {
      'attributes': {
        'In_Progress': progress,
        'Completed': completed,
        'Planned': planned
      }

    }
  ]
};
 
// Return the FeatureSet
return FeatureSet(StorageDict);