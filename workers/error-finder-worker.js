var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/support/geodesicUtils", "esri/geometry/support/webMercatorUtils"], function (require, exports, Point_1, Polyline_1, geodesicUtils, webMercUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Point_1 = __importDefault(Point_1);
    Polyline_1 = __importDefault(Polyline_1);
    geodesicUtils = __importStar(geodesicUtils);
    webMercUtils = __importStar(webMercUtils);
    var config;
    var roadFeatures;
    var roadFeatureErrors = [];
    var validRoadFeatures = [];
    var roadLookup = {};
    var addressFeatures;
    var addressFeatureErrors = [];
    var validAddressFeatures = [];
    var addressFields;
    var fullAddressDuplicates = {};
    var geometryDuplicates = {};
    var syncErrors = [];
    var addressRoadPairs = {};
    var fishboneGraphics = [];
    exports.setConfiguration = function (params) {
        config = params.config;
        addressFields = Object.values(config.addressFields).flat();
    };
    // *********************************
    //
    // *************ROADS***************
    //
    // *********************************
    function getRoadErrors(params, _a) {
        var client = _a.client;
        roadFeatures = JSON.parse(params.roadFeatures);
        roadFeatures.forEach(function (f, idx) {
            if (idx % 100 === 0) {
                client.invoke("incrementProgress", {
                    id: "road-errors",
                    value: idx / roadFeatures.length
                });
            }
            addRoadAttributes(f);
            if (f.attributes.OBJECTID === 43273) {
                console.log("asdfaf");
            }
            if (validRoadFieldValues(f)) {
                if (f.attributes.OBJECTID === 5726) {
                    console.log("asdfaf");
                }
                if (!validRanges(f)) {
                    // || !validRoadGeom(f) || !multiPartGeom(f)
                    roadFeatureErrors.push(JSON.parse(JSON.stringify(f)));
                }
                populateRoadLookup(f);
                overlappingRanges(f);
                validRoadFeatures.push(f);
            }
            else {
                roadFeatureErrors.push(JSON.parse(JSON.stringify(f)));
            }
        });
        client.invoke("incrementProgress", {
            id: "road-errors",
            value: 1
        });
        console.log("road errors: " + roadFeatureErrors.length);
        return roadFeatureErrors;
    }
    exports.getRoadErrors = getRoadErrors;
    var addRoadAttributes = function (f) {
        // f.lowHighAddressRanges = getLowsAndHighs(f);
        f.addressRanges = getRanges(f);
        f.communities = getCommunities(f);
        f.roadName = getRoadFullRoadName(f);
        f.objectId = f.attributes[config.roadObjectIdField];
    };
    var getLowsAndHighs = function (f) {
        return [
            [
                Math.min.apply(Math, [config.roadFields.fromLeft, config.roadFields.toLeft].map(function (fn) {
                    return Number(f.attributes[fn]);
                })),
                Math.max.apply(Math, [config.roadFields.fromLeft, config.roadFields.toLeft].map(function (fn) {
                    return Number(f.attributes[fn]);
                }))
            ],
            [
                Math.min.apply(Math, [config.roadFields.fromRight, config.roadFields.toRight].map(function (fn) {
                    return Number(f.attributes[fn]);
                })),
                Math.max.apply(Math, [config.roadFields.fromRight, config.roadFields.toRight].map(function (fn) {
                    return Number(f.attributes[fn]);
                }))
            ]
        ];
    };
    var getRanges = function (f) {
        return [
            [
                Number(f.attributes[config.roadFields.fromLeft]),
                Number(f.attributes[config.roadFields.toLeft])
            ],
            [
                Number(f.attributes[config.roadFields.fromRight]),
                Number(f.attributes[config.roadFields.toRight])
            ]
        ];
    };
    var getCommunities = function (f) {
        return [
            String(f.attributes[config.roadFields.leftCommunity]),
            String(f.attributes[config.roadFields.rightCommunity])
        ];
    };
    var getRoadFullRoadName = function (f) {
        return config.roadFields.roadNames
            .map(function (fn) {
            return f.attributes[fn] == null ? "" : f.attributes[fn];
        })
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    };
    var validRoadFieldValues = function (f) {
        var errorMessage = "";
        var addressRangeFields = [
            config.roadFields.fromLeft,
            config.roadFields.toLeft,
            config.roadFields.fromRight,
            config.roadFields.toRight
        ];
        // not a positive number in the address range fields
        addressRangeFields.forEach(function (field) {
            if (isNaN(f.attributes[field]) || f.attributes[field] < 0) {
                errorMessage += field + " is invalid, ";
            }
        });
        // no community value(s)
        [config.roadFields.leftCommunity, config.roadFields.rightCommunity].forEach(function (field) {
            var _a;
            if (((_a = f.attributes[field]) === null || _a === void 0 ? void 0 : _a.length) < 1) {
                errorMessage += field + " is blank, ";
            }
        });
        // no road name
        if (f.roadName.length <= 0) {
            errorMessage += "no road name, ";
        }
        if (errorMessage.length) {
            f.attributes.ERROR = errorMessage.slice(0, -2);
            f.error = "road-bad-attributes";
            return false;
        }
        return true;
    };
    var validRanges = function (f) {
        if (f.addressRanges[0][0] % 2 !== f.addressRanges[0][1] % 2 ||
            f.addressRanges[1][0] % 2 !== f.addressRanges[1][1] % 2) {
            f.attributes.ERROR = "Road range parity";
            f.error = "road-range-parity";
            return false;
        }
        if (f.addressRanges[0][0] > f.addressRanges[0][1] ||
            f.addressRanges[1][0] > f.addressRanges[1][1]) {
            f.attributes.ERROR = "Address range low greater than high";
            f.error = "road-range-low-greater-than-high";
            return false;
        }
        if ((f.addressRanges[0][0] === 0) !== (f.addressRanges[0][1] === 0) ||
            (f.addressRanges[1][0] === 0) !== (f.addressRanges[1][1] === 0)) {
            f.attributes.ERROR = "Zero-nonzero range";
            f.error = "zero-nonzero";
            return false;
        }
        return true;
    };
    // const validRoadGeom = (f: RoadErrorGraphic) => {
    //   if (f.geometry == null) {
    //     f.attributes.ERROR = "Null geometry";
    //     f.error = "null-road-geometry";
    //     return false;
    //   }
    //   return true;
    // };
    // const multiPartGeom = (f: RoadErrorGraphic) => {
    //   if ((f.geometry as esri.Polyline).paths.length > 1) {
    //     f.attributes.ERROR = "Multipart geometry";
    //     f.error = "multipart-geometry";
    //     return false;
    //   }
    //   return true;
    // };
    var populateRoadLookup = function (f) {
        !(f.roadName in roadLookup) && (roadLookup[f.roadName] = {});
        !(f.communities[0] in roadLookup[f.roadName]) &&
            (roadLookup[f.roadName][f.communities[0]] = []);
        roadLookup[f.roadName][f.communities[0]].push(f);
        if (f.communities[0] === f.communities[1]) {
            return;
        }
        !(f.communities[1] in roadLookup[f.roadName]) &&
            (roadLookup[f.roadName][f.communities[1]] = []);
        roadLookup[f.roadName][f.communities[1]].push(f);
    };
    var overlappingRanges = function (fa) {
        var pairs = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ];
        validRoadFeatures.forEach(function (fb, i) {
            if (fa.roadName === fb.roadName) {
                for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                    var pair = pairs_1[_i];
                    if (fa.communities[pair[0]] !== fb.communities[pair[1]] ||
                        (fa.objectId === fb.objectId && pair[0] === pair[1])) {
                        continue;
                    }
                    if (isBetween(fa.addressRanges[pair[0]], fb.addressRanges[pair[1]])) {
                        var faCopy = JSON.parse(JSON.stringify(fa));
                        var fbCopy = JSON.parse(JSON.stringify(fb));
                        faCopy.error = fbCopy.error = "overlapping-range";
                        faCopy.attributes.ERROR = fbCopy.attributes.ERROR =
                            "Overlapping address range";
                        roadFeatureErrors.push(faCopy, fbCopy);
                        return;
                    }
                }
            }
        });
        // return badRoads.map(f => {
        //  f.geomString = JSON.stringify(f.geometry);
        //  return f;
        // });
    };
    var isBetween = function (a, b) {
        for (var i = 0; i <= 1; i++) {
            if (a[i] !== 0 &&
                (a[i] % 2 === b[0] % 2 || a[i] % 2 === b[1] % 2) &&
                Math.min.apply(Math, b) <= a[i] &&
                a[i] <= Math.max.apply(Math, b)) {
                return true;
            }
        }
        return false;
    };
    // *********************************
    //
    // ***********ADDRESSES*************
    //
    // *********************************
    function getAddressErrors(params, _a) {
        var client = _a.client;
        addressFeatures = JSON.parse(params.addressFeatures);
        addressFeatures.forEach(function (f, idx) {
            if (idx % 100 === 0) {
                client.invoke("incrementProgress", {
                    id: "address-errors",
                    value: (idx / addressFeatures.length) * 0.9
                });
            }
            addAddressAttributes(f);
            if (validAddressFieldValues(f)) {
                if (!validAddressGeom(f)) {
                    addressFeatureErrors.push(JSON.parse(JSON.stringify(f)));
                }
                fullAddressDuplicates[f.fullAddress] =
                    ++fullAddressDuplicates[f.fullAddress] || 0;
                geometryDuplicates[JSON.stringify(f.geometry)] =
                    ++geometryDuplicates[JSON.stringify(f.geometry)] || 0;
                validAddressFeatures.push(f);
            }
            else {
                addressFeatureErrors.push(JSON.parse(JSON.stringify(f)));
            }
        });
        validAddressFeatures.forEach(function (f, idx) {
            if (idx % 100 === 0) {
                client.invoke("incrementProgress", {
                    id: "address-errors",
                    value: (idx / validAddressFeatures.length) * 0.1 + 0.9
                });
            }
            if (fullAddressDuplicates[f.fullAddress]) {
                f.attributes.ERROR = "Duplicate address";
                f.error = "duplicate-address";
                addressFeatureErrors.push(JSON.parse(JSON.stringify(f)));
            }
            if (geometryDuplicates[f.fullAddress]) {
                f.attributes.ERROR = "Duplicate geometry";
                f.error = "duplicate-geometry";
                addressFeatureErrors.push(JSON.parse(JSON.stringify(f)));
            }
        });
        client.invoke("incrementProgress", {
            id: "address-errors",
            value: 1
        });
        console.log("address errors: " + addressFeatureErrors.length);
        return addressFeatureErrors;
    }
    exports.getAddressErrors = getAddressErrors;
    var addAddressAttributes = function (f) {
        f.objectId = f.attributes[config.addressObjectIdField];
        f.roadName = setAddressFullRoadName(f);
        f.fullAddress = setAddressFullAddress(f);
    };
    var setAddressFullRoadName = function (f) {
        return config.addressFields.roadNames
            .map(function (fn) {
            return f.attributes[fn] == null ? "" : f.attributes[fn];
        })
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    };
    var setAddressFullAddress = function (f) {
        return addressFields
            .map(function (fn) {
            return f.attributes[fn] == null ? "" : f.attributes[fn];
        })
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    };
    var validAddressFieldValues = function (f) {
        var errorMessage = "";
        // houseNumber
        if (isNaN(f.attributes[config.addressFields.houseNumber]) ||
            f.attributes[config.addressFields.houseNumber] < 0) {
            errorMessage += config.addressFields.houseNumber + " is invalid, ";
        }
        else {
            f.houseNumber = f.attributes[config.addressFields.houseNumber];
        }
        // community
        if (f.attributes[config.addressFields.community] == null ||
            String(f.attributes[config.addressFields.community]).length < 1) {
            errorMessage += config.addressFields.community + " is blank, ";
        }
        else {
            f.community = String(f.attributes[config.addressFields.community]);
        }
        // roadName
        if (f.roadName.length <= 0) {
            errorMessage += "no road name, ";
        }
        if (errorMessage.length) {
            f.attributes.ERROR = errorMessage.slice(0, -2);
            f.error = "address-bad-attributes";
            return false;
        }
        return true;
    };
    var validAddressGeom = function (f) {
        if (f.geometry == null) {
            f.attributes.ERROR = "Null geometry";
            f.error = "null-address-geometry";
            return false;
        }
        return true;
    };
    // *********************************
    //
    // ***********FISHBONES*************
    //
    // *********************************
    function syncAddressesAndRoads(_a, _b) {
        var client = _b.client;
        var t0 = performance.now();
        validAddressFeatures.forEach(function (f, idx) {
            if (idx % 100 === 0) {
                client.invoke("incrementProgress", {
                    id: "sync-errors",
                    value: idx / validAddressFeatures.length
                });
            }
            if (!roadDataSync(f)) {
                syncErrors.push(JSON.parse(JSON.stringify(f)));
            }
            else {
                makeFishbones(f);
            }
        });
        console.log("Sync time:" + (performance.now() - t0) + " milliseconds");
        console.log("sync errors: " + syncErrors.length);
        client.invoke("incrementProgress", {
            id: "sync-errors",
            value: 1
        });
        return { syncErrors: syncErrors, fishboneGraphics: fishboneGraphics };
    }
    exports.syncAddressesAndRoads = syncAddressesAndRoads;
    var roadDataSync = function (f) {
        if (!(f.roadName in roadLookup)) {
            f.attributes.ERROR = f.roadName + " not found in roads";
            f.error = "no-matching-roadname";
            return false;
        }
        if (!(f.community in roadLookup[f.roadName])) {
            f.attributes.ERROR = f.roadName + "-" + f.community + " not in roads";
            f.error = "no-matching-road-community";
            return false;
        }
        var matches = [];
        if (f.attributes.OBJECTID === 43273) {
            console.log("asdfaf");
        }
        roadLookup[f.roadName][f.community].forEach(function (rs) {
            var _a, _b;
            var rsGeom = rs.geometry;
            if (rs.communities[0] === f.community &&
                isWithin(f.houseNumber, rs.addressRanges[0]) &&
                ((_a = rsGeom === null || rsGeom === void 0 ? void 0 : rsGeom.paths) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                matches.push({
                    side: 0,
                    rsOID: rs.objectId,
                    rsGeom: rs.geometry,
                    addressRanges: rs.addressRanges
                });
            }
            if (rs.communities[1] === f.community &&
                isWithin(f.houseNumber, rs.addressRanges[1]) &&
                ((_b = rsGeom === null || rsGeom === void 0 ? void 0 : rsGeom.paths) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                matches.push({
                    side: 1,
                    rsOID: rs.objectId,
                    rsGeom: rs.geometry,
                    addressRanges: rs.addressRanges
                });
            }
        });
        if (matches.length === 0) {
            f.attributes.ERROR = "Not in address range";
            f.error = "no-matching-road-segment-address-range";
            return false;
        }
        if (matches.length > 1) {
            f.attributes.ERROR = "Matches multiple segments/sides";
            f.error = "matches-multiple-segments";
            return false;
        }
        addressRoadPairs[f.objectId] = matches[0];
        return true;
    };
    var isWithin = function (a, b) {
        return (Math.min.apply(Math, b) <= a &&
            a <= Math.max.apply(Math, b) &&
            (a % 2 === Math.min.apply(Math, b) % 2 || a % 2 === Math.max.apply(Math, b) % 2));
        // return b[0] <= a && a <= b[1] && (a % 2 === b[0] % 2 || a % 2 === b[1] % 2);
    };
    function makeFishbones(f) {
        var _a, _b;
        if (f.attributes[config.addressObjectIdField] in addressRoadPairs) {
            if (f.attributes.roadname === "MCCORMICK" && f.attributes.addnum === 400) {
                console.log("mccormick st");
            }
            var match = addressRoadPairs[f.attributes[config.addressObjectIdField]];
            var rsGeom = void 0;
            if (((_b = (_a = match.rsGeom) === null || _a === void 0 ? void 0 : _a.paths) === null || _b === void 0 ? void 0 : _b.length) <= 1) {
                rsGeom = match.rsGeom;
            }
            else {
                return;
            }
            var endpoint = getEndpoint(Number(f.attributes[config.addressFields.houseNumber]), addressRoadPairs[f.attributes[config.addressObjectIdField]], rsGeom);
            var afPath_1 = [
                [f.geometry.x, f.geometry.y],
                endpoint
            ];
            var grphc_1 = {
                attributes: f.attributes,
                geometry: {
                    type: "polyline",
                    spatialReference: { wkid: match.rsGeom.spatialReference.wkid },
                    paths: [afPath_1]
                },
                symbol: {
                    type: "simple-line",
                    miterLimit: 0,
                    width: 1.5,
                    color: [76, 230, 0, 0.75]
                }
                // rsGeom: rsGeom
            };
            if (crossesRoad(grphc_1, rsGeom)) {
                grphc_1.symbol = {
                    type: "simple-line",
                    miterLimit: 0,
                    width: 1.5,
                    color: [255, 0, 0, 0.5]
                };
                grphc_1.attributes.ERROR =
                    "address geocodes to incorrect side of the street";
                grphc_1.error = "road-parity";
            }
            else if (crossesAnyRoad(grphc_1)) {
                grphc_1.symbol = {
                    type: "simple-line",
                    miterLimit: 0,
                    width: 1.5,
                    color: [255, 0, 0, 0.5]
                };
                grphc_1.attributes.ERROR = "address geocodes to the incorrect block";
                grphc_1.error = "crosses-other-road";
            }
            fishboneGraphics.forEach(function (fg) {
                var fgPath = fg.geometry.paths[0];
                if (intersects(afPath_1[0][0], afPath_1[0][1], afPath_1[1][0], afPath_1[1][1], fgPath[0][0], fgPath[0][1], fgPath[1][0], fgPath[1][1])) {
                    grphc_1.symbol = {
                        type: "simple-line",
                        miterLimit: 0,
                        width: 1.5,
                        color: [255, 0, 0, 0.5]
                    };
                    grphc_1.attributes.ERROR = "address out of order";
                    grphc_1.error = "fishbones-cross";
                    fg.symbol = {
                        type: "simple-line",
                        miterLimit: 0,
                        width: 1.5,
                        color: [255, 0, 0, 0.5]
                    };
                    fg.attributes.ERROR = "address out of order";
                    fg.error = "fishbones-cross";
                }
            });
            fishboneGraphics.push(grphc_1);
        }
    }
    exports.makeFishbones = makeFishbones;
    var getEndpoint = function (houseNumber, m, rsGeom) {
        var percentAlong = getPercentAlongSegment(houseNumber, m);
        var rsPolyline = new Polyline_1.default(rsGeom);
        var totalLength = geodesicUtils.geodesicLengths([
            new Polyline_1.default(webMercUtils.webMercatorToGeographic(rsGeom))
        ])[0];
        // const totalLength = getTotalLength(rsGeom);
        var _a = getPointAlongLine(rsPolyline, (totalLength - 4) * percentAlong + 2), pointOnLine = _a.pointOnLine, angle = _a.angle;
        // (totalLength - 4) * percentAlong + 2
        return getPointAtDistance(pointOnLine, toDegrees(angle), m.side);
    };
    var getTotalLength = function (geometry) {
        var totalLength = 0;
        geometry.paths.forEach(function (path) {
            for (var i = 1; i < path.length; i++) {
                totalLength += Math.sqrt(Math.pow(path[i][0] - path[i - 1][0], 2) +
                    Math.pow(path[i][1] - path[i - 1][1], 2));
            }
        });
        return totalLength;
    };
    var getPointAlongLine = function (polyline, distance) {
        var x1;
        var x2;
        var y1;
        var y2;
        var travelledDistance = 0;
        var pathDistance;
        var distanceDiff;
        var angle;
        for (var _i = 0, _a = polyline.paths; _i < _a.length; _i++) {
            var path = _a[_i];
            x1 = path[0][0];
            y1 = path[0][1];
            x2 = path[1][0];
            y2 = path[1][1];
            angle = Math.atan2(y2 - y1, x2 - x1);
            if (distance === 0) {
                return { pointOnLine: polyline.getPoint(0, 0), angle: angle };
            }
            else if (distance > 0) {
                for (var i = 1; i < path.length; i++) {
                    x1 = path[i - 1][0];
                    y1 = path[i - 1][1];
                    x2 = path[i][0];
                    y2 = path[i][1];
                    var from = webMercUtils.webMercatorToGeographic(new Point_1.default({
                        x: x1,
                        y: y1,
                        spatialReference: polyline.spatialReference
                    }));
                    var to = webMercUtils.webMercatorToGeographic(new Point_1.default({
                        x: x2,
                        y: y2,
                        spatialReference: polyline.spatialReference
                    }));
                    pathDistance = geodesicUtils.geodesicDistance(from, to).distance;
                    // pathDistance = getTotalLength({paths:[path]})
                    angle = Math.atan2(y2 - y1, x2 - x1);
                    travelledDistance += pathDistance;
                    if (travelledDistance === distance) {
                        return { pointOnLine: polyline.getPoint(0, i), angle: angle };
                    }
                    else if (travelledDistance > distance) {
                        distanceDiff = distance - (travelledDistance - pathDistance);
                        var bearing = toDegrees(angle);
                        bearing = bearing * -1 + 90;
                        bearing += 360;
                        bearing = bearing % 360;
                        return {
                            pointOnLine: geodesicUtils.pointFromDistance(webMercUtils.webMercatorToGeographic(polyline.getPoint(0, i - 1)), distanceDiff, bearing),
                            angle: angle
                        };
                    }
                }
            }
        }
        var pointOnLine = { latitude: 0, longitude: 0 };
        return { pointOnLine: pointOnLine, angle: 0 };
    };
    var getPointAtDistance = function (point, bearing, side) {
        bearing = bearing * -1 + 90;
        bearing += 360;
        if (side === 0) {
            bearing += -90;
        }
        if (side === 1) {
            bearing += 90;
        }
        bearing = bearing % 360;
        var endpoint = webMercUtils.geographicToWebMercator(geodesicUtils.pointFromDistance(point, 2, bearing));
        return [endpoint.x, endpoint.y];
    };
    var toDegrees = function (val) {
        return (val * 180) / Math.PI;
    };
    var getPercentAlongSegment = function (houseNumber, match) {
        var denom = Math.abs(match.addressRanges[match.side][1] - match.addressRanges[match.side][0]);
        if (match.addressRanges[match.side][1] < match.addressRanges[match.side][0]) {
            if (denom !== 0) {
                return (1 - (houseNumber - Math.min.apply(Math, match.addressRanges[match.side])) / denom);
            }
            else {
                return 0.5;
            }
        }
        if (denom !== 0) {
            return (houseNumber - Math.min.apply(Math, match.addressRanges[match.side])) / denom;
        }
        else {
            return 0.5;
        }
    };
    function intersects(a, b, c, d, p, q, r, s) {
        var det;
        var gamma;
        var lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        }
        else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
        }
    }
    function crossesRoad(grphc, rsGeom) {
        return rsGeom.paths.some(function (path) {
            for (var i = 1; i < path.length; i++) {
                var segment = [path[i - 1], path[i]];
                if (intersects(grphc.geometry.paths[0][0][0], grphc.geometry.paths[0][0][1], grphc.geometry.paths[0][1][0], grphc.geometry.paths[0][1][1], segment[0][0], segment[0][1], segment[1][0], segment[1][1])) {
                    return true;
                }
            }
        });
    }
    function crossesAnyRoad(grphc) {
        var grphcExtent = {
            xmin: Math.min(grphc.geometry.paths[0][0][0], grphc.geometry.paths[0][1][0]),
            xmax: Math.max(grphc.geometry.paths[0][0][0], grphc.geometry.paths[0][1][0]),
            ymin: Math.min(grphc.geometry.paths[0][0][1], grphc.geometry.paths[0][1][1]),
            ymax: Math.max(grphc.geometry.paths[0][0][1], grphc.geometry.paths[0][1][1])
        };
        for (var _i = 0, roadFeatures_1 = roadFeatures; _i < roadFeatures_1.length; _i++) {
            var roadFeature = roadFeatures_1[_i];
            if (roadFeature.attributes.objectid === 104937) {
                // console.log("service");
            }
            if (overlappingExtents(grphcExtent, roadFeature.geometry.extent)) {
                if (crossesRoad(grphc, roadFeature.geometry)) {
                    return true;
                }
            }
        }
        return false;
    }
    function getFishboneLength(grphc) {
        return Math.sqrt(Math.pow(grphc.geometry.paths[0][0][0] - grphc.geometry.paths[0][1][0], 2) +
            Math.pow(grphc.geometry.paths[0][0][1] - grphc.geometry.paths[0][1][1], 2));
    }
    var overlappingExtents = function (a, b) {
        var overlap = (((a.xmax >= b.xmax && b.xmax >= a.xmin) ||
            (a.xmax >= b.xmin && b.xmin >= a.xmin)) &&
            ((a.ymax >= b.ymax && b.ymax >= a.ymin) ||
                (a.ymax >= b.ymin && b.ymin >= a.ymin))) ||
            (((b.xmax >= a.xmax && a.xmax >= b.xmin) ||
                (b.xmax >= a.xmin && a.xmin >= b.xmin)) &&
                ((b.ymax >= a.ymax && a.ymax >= b.ymin) ||
                    (b.ymax >= a.ymin && a.ymin >= b.ymin))) ||
            (((a.xmax >= b.xmax && b.xmin >= a.xmin) ||
                (b.xmax >= a.xmax && a.xmin >= b.xmin)) &&
                ((a.ymax >= b.ymax && b.ymin >= a.ymin) ||
                    (b.ymax >= a.ymax && a.ymin >= b.ymin)));
        return overlap;
    };
});
