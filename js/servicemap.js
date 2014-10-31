/***        Create an ESRI BootstrapMap from only a MapService URL         ***/
/***                                                                       ***/
/***   This includes the construction of a table of contents with legend   ***/
/***          swatches and layer control, and click to identify.           ***/
/***                                                                       ***/
/***   07/16/2014 - v0.9: Beta Testing Version                             ***/
/***   08/20/2014 - v1.0: Initial release                                  ***/

var viewerName = 'Chapter 66'
var serviceURL = 'http://gis.nola.gov:6080/arcgis/rest/services/Staging/Historic/MapServer';
var basemapURL = 'http://gis.nola.gov:6080/arcgis/rest/services/Basemaps/BasemapNOLA3/MapServer';
var SvcMap;

function initMap()
{
    SvcMap = new ServiceMap(viewerName, serviceURL, basemapURL);
    SvcMap.init();
}

function ServiceMap(vwName, svcURL, bmapURL)
{
    var __this__ = this;
    //Table of Contents properties
    this.tocItems = {};
    this.layerIds = {};
    this.svcURL = svcURL;
    this.bmapURL = bmapURL;
    this.tocId = '#toc';
    this.menuSections = 0;

    //Map Properties
    this.mapId = '#mapDiv';
    this.map = {};
    this.serviceLayer = {};

    //Viewer Name
    $('.navbar-brand').append(vwName);

    //Table of Contents methods
    this.init = function()
    {
        if (__this__.svcURL != '')
        {
            $.getJSON(__this__.svcURL+'?f=json', {}, __this__.buildTOC)
                .fail(function(){console.log('Error Getting Data');});
        }
    };

    this.buildTOC = function(data)
    {
        //Begin building the table of contents by building the layer tree and
        // fetching the legend data.
        var layers = data['layers']
        __this__.layerIds = __this__.buildTree(layers, -1);
        $.getJSON(__this__.svcURL+'/legend?f=json', {}, (function(data){__this__.buildTOCItems(data, layers);}))
            .fail(function(){console.log('Error Getting Data');});
    };

    this.buildTOCItems = function(data, layers)
    {
        //Pluck the data necessary from the layers and legend.
        for (var i=0; i<layers.length; i++)
        {
            var legendData = null;
            var legendIdx = -1;
            for (var j=0; j<data['layers'].length; j++)
            {
                if (data['layers'][j]['layerId'] == i)
                {
                    legendIdx = j;
                    break;
                }
            }
            if (legendIdx != -1)
            {
                legendData = data['layers'][legendIdx]['legend'];
            }
            __this__.tocItems[layers[i]['id']] = 
            {
                'name': layers[i]['name'],
                'visibility': layers[i]['defaultVisibility'],
                'parent': layers[i]['parentLayerId'],
                'sublayers': layers[i]['subLayerIds'],
                'legend': legendData
            };
        }
        __this__.createMap(__this__.mapId);
        $(__this__.tocId).append(__this__.buildHTML(__this__.layerIds, __this__.tocItems, ''));
        var mapHeight = $(__this__.tocId).innerHeight();
        $(__this__.mapId).height(mapHeight);
    }

    this.buildTree = function(layers, root)
    {
        //Build the tree of layer ids from the map service definition recursively.
        var branch = {};
        for (var i=0; i<layers.length; i++)
        {
            if (layers[i]['parentLayerId'] == root)
            {
                if (layers[i]['subLayerIds'] != null)
                {
                    branch[layers[i]['id']] = __this__.buildTree(layers, layers[i]['id']);
                }
                else
                {
                    branch[layers[i]['id']] = null;
                }
            }
        }
        return branch;
    };

    this.buildHTML = function(layerids, layers, menuid)
    {
        //Build the list html for the TOC recursively.
        //The HTML attributes make this too long.
        var listClass = {};
        if (menuid != '')
        {        
            var listClass = {'class': 'collapse', 'id': menuid};
        }
        var tocList = $('<ul></ul>', listClass);
        //For some reason, js thinks it's good enough to return strings of the 
        // keys, even if they're not. We fix that here.
        var currKeys = Object.keys(layerids).map(function(item) {return parseInt(item, 10);});
        //Also, number sorting requires special handling to avoid being done in 
        // text order (i.e., 1, 10, 11, 2, ...), which is clearly a brilliant idea.
        currKeys.sort(function (a, b) {return a - b;});
        for (var i=0; i<currKeys.length; i++)
        {
            if (layerids[currKeys[i]] != null)
            {
                var itemName = layers[currKeys[i]]['name'];
                var legendIcon = __this__.getIcon(currKeys[i], layers);
                var nextMenu = 'menu' + __this__.menuSections.toString();
                __this__.menuSections++;
                var linkAttr = {
                    'href':'#', 
                    'data-toggle': 'collapse', 
                    'data-target': '#'+nextMenu,
                    'click': (function(){$(this).find('.indicator').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');})
                };
                var rightArrow = $('<span class="indicator glyphicon-chevron-right"></span>');
                var collapseLink = $('<a></a>', linkAttr).append(rightArrow, '&nbsp;', itemName);
                var checkAttr = {
                    'type': 'checkbox',
                    'id': 'check_' + currKeys[i].toString(),
                    'class': 'layertoggle',
                    'checked': layers[currKeys[i]]['visibility'],
                    'title': (layers[currKeys[i]]['visibility'] ? 'Hide Group' : 'Show Group'),
                    'change': (function(){__this__.toggleLayerVis(this.id);})
                };
                var checkBox = $('<input>', checkAttr);
                var subList = $('<li></li>').append(checkBox, collapseLink, legendIcon);
                subList.append(__this__.buildHTML(layerids[currKeys[i]], layers, nextMenu));
                tocList.append(subList);
            }
            else
            {
                var itemName = layers[currKeys[i]]['name'];
                var legendIcon = __this__.getIcon(currKeys[i], layers);
                var checkAttr = {
                    'type': 'checkbox',
                    'id': 'check_' + currKeys[i].toString(),
                    'class': 'layertoggle',
                    'checked': layers[currKeys[i]]['visibility'],
                    'title': (layers[currKeys[i]]['visibility'] ? 'Hide' : 'Show'),
                    'change': (function(){__this__.toggleLayerVis(this.id);})
                };
                var checkBox = $('<input>', checkAttr);
                tocList.append($('<li></li>').append(checkBox, itemName, legendIcon));
            }
        }
        return tocList;
    };

    this.getIcon = function(layernum, layers)
    {
        //Determine how to show the legend, and return the DOM node.
        var legendItems = layers[layernum]['legend'];
        var iconDiv = $('<div></div>', {'class': 'icons'});
        if (legendItems != null)
        {
            var icon = $('<ul></ul>');
            for (var i=0; i<legendItems.length; i++)
            {
                var iconImage = legendItems[i]['imageData'];
                var iconType = legendItems[i]['contentType'];
                var iconLabel = legendItems[i]['label'].replace('<', '').replace('>', '');
                var iconAlt = layers[layernum]['name']
                var bullet = 'url(data:'+iconType+';base64,'+iconImage+')';
                icon.append($('<li></li>', {'style': 'list-style-image:'+bullet}).append(iconLabel));
            }
            iconDiv.append(icon);
        }
        return iconDiv;
    }

    //Map methods
    this.createMap = function(mapdiv)
    {
        //Create the map in the mapdiv
        //dojo wants 'mapDiv', jQuery wants '#mapDiv': accomodate here.
        var divname = (mapdiv.slice(0, 1) == '#' ? mapdiv.slice(1) : mapdiv)
        require(["esri/map", "application/bootstrapmap", 
                 "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
                 "esri/symbols/SimpleMarkerSymbol", "esri/Color", "dojo/domReady!"], 
            function(Map, BootstrapMap, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color) {
                var mapOpts = {
                    'center': [-90.0, 30.0],
                    'zoom': 11,
                    'scrollWheelZoom': true,
                    'logo': false
                }
                __this__.map = BootstrapMap.create(divname.toString(), mapOpts);
                if (!__this__.bmapURL || __this__.bmapURL == '')
                {
                    __this__.map.setBasemap('national-geographic');
                }
                else
                {
                    require(["esri/layers/ArcGISTiledMapServiceLayer"], 
                        function(ArcGISTiledMapServiceLayer) {
                            var bmapOpts = {'showAttribution': false};
                            var basemap = new ArcGISTiledMapServiceLayer(__this__.bmapURL, bmapOpts);
                            __this__.map.addLayer(basemap);
                    });
                }
                var mapLoaded = __this__.map.on('load', function(){__this__.addServices();});
        });
    }

    this.addServices = function()
    {
        //Add the service layer to the map, and call the method to build the
        // PopupTemplates.
        $.getJSON(__this__.svcURL+'/layers?f=json', {}, __this__.createTemplates)
            .fail(function(){console.log('Error Getting Data');});
        require(["esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ImageParameters"], 
            function(ArcGISDynamicMapServiceLayer, ImageParameters) 
                {
                    var imgParams = new ImageParameters();
                    imgParams.format = 'PNG32';
                    var svcOptions = {'imageParameters': imgParams};
                    __this__.serviceLayer = new ArcGISDynamicMapServiceLayer(__this__.svcURL, svcOptions);
                });
        __this__.map.addLayer(__this__.serviceLayer);

        //Make sure the map is the right size and in the correct spot on the page.
        __this__.map.resize(true);
        __this__.map.reposition();
    }

    this.createTemplates = function(data)
    {
        //Parse through the layer information, and build the Templates for 
        // display in the Popups.  This requires API v3.10.
        var skipFields = ['OBJECTID', 'SHAPE', 'SHAPE_LENGTH', 'SHAPE_AREA'];
        var templates = {};
        var optHolder = [];
        var layers = data['layers'];
        for (var i=0; i<layers.length; i++)
        {
            var templateOpts = {};
            var flds = layers[i]['fields'];
            var outFields = [];
            if (flds != null) //Skip Group Layers
            {
                for (var j=0; j<flds.length; j++)
                {
                    if (skipFields.indexOf(flds[j]['name'].toUpperCase()) == -1)
                    {
                        outFields.push({'fieldName': flds[j]['name'], 'label': flds[j]['alias'], 'visible': true})
                    }
                }
            }
            templateOpts['title'] = layers[i]['name'];
            templateOpts['fieldInfos'] = outFields
            optHolder.push(templateOpts);
        }
        require(['esri/dijit/PopupTemplate'], 
            function(PopupTemplate)
                {
                    for (var k=0; k<optHolder.length; k++)
                    {
                        templates[k] = {'infoTemplate': new PopupTemplate(optHolder[k])};
                    }
                });
        __this__.serviceLayer.setInfoTemplates(templates);
    }

    this.getLayersToShow = function(checked, layerids)
    {
        //Determine which layers should be visible, based on check boxes, recursively.
        var vizlyrs = []
        var currKeys = Object.keys(layerids).map(function(item) {return parseInt(item, 10);});
        currKeys.sort(function (a, b) {return a - b;});
        for (var i=0; i<currKeys.length; i++)
        {
            if (checked[currKeys[i]])
            {
                if (layerids[currKeys[i]] != null)
                {
                    vizlyrs = vizlyrs.concat(__this__.getLayersToShow(checked, layerids[currKeys[i]]));
                }
                else
                {
                    vizlyrs.push(currKeys[i]);
                }
            }
        }
        return vizlyrs;
    }

    this.toggleLayerVis = function(clickedid)
    {
        //Toggle the layer visibility in the map based on the check boxes.
        var checkTitle = $('#'+clickedid).attr('title');
        if (checkTitle.indexOf('Show') != -1)
        {
            $('#'+clickedid).attr('title', checkTitle.replace('Show', 'Hide'));
        }
        else if (checkTitle.indexOf('Hide') != -1)
        {
            $('#'+clickedid).attr('title', checkTitle.replace('Hide', 'Show'));
        }
        var layerNum = parseInt(clickedid.split('_')[1], 10);

        var checkedBoxes = $('.layertoggle').map(function(i, x){return $(x).prop('checked');}).get();
        var checkedLayers = {}
        for (var i=0; i<checkedBoxes.length; i++)
        {
            checkedLayers[i] = checkedBoxes[i];
        }

        var vizLayers = __this__.getLayersToShow(checkedLayers, __this__.layerIds);
        if (vizLayers.length == 0)
        {
            vizLayers = [-1];
        }
        __this__.serviceLayer.setVisibleLayers(vizLayers);
    }
    //End ServiceMap
}