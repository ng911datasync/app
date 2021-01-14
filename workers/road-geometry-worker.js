var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config;
    var roadFeatures;
    var roadErrors = {
        nullGeoms: [],
        multiPartGeoms: [],
        vectorFlips: [],
        parityFlips: [],
        duplicateGeoms: [],
        intersectingGeoms: [],
        dangles: [],
        overlappingGeoms: { points: [], lines: [] }
    };
    var validGeoms = [];
    var vectorFlipErrors = {};
    var segments = {};
    var endpoints = [];
    exports.setConfiguration = function (params) {
        config = params.config;
    };
    function getRoadErrors(params, _a) {
        var client = _a.client;
        roadFeatures = JSON.parse(params.roadFeatures);
        var t0 = performance.now();
        roadFeatures.forEach(function (f, idx) {
            if (idx % 100 === 0) {
                client.invoke("incrementProgress", {
                    id: "road-geom-errors",
                    value: idx / roadFeatures.length
                });
            }
            var fGeom = f.geometry;
            if (nonNullGeom(f) && singlePartGeom(f)) {
                for (var _i = 0, validGeoms_1 = validGeoms; _i < validGeoms_1.length; _i++) {
                    var gGeom = validGeoms_1[_i];
                    if (overlappingExtents(fGeom.extent, gGeom.extent)) {
                        if (!getDuplicate(fGeom, gGeom)) {
                            getOverlap(fGeom, gGeom);
                            getIntersecting(fGeom, gGeom);
                        }
                    }
                }
                compileSegmentEndpoints(f);
                validGeoms.push(fGeom);
            }
        });
        var t1 = performance.now();
        console.log("iterate roadFeatures took " + (t1 - t0) + " milliseconds.");
        t0 = performance.now();
        getVectorFlipErrors();
        t1 = performance.now();
        console.log("iterate vectorFlip took " + (t1 - t0) + " milliseconds.");
        t0 = performance.now();
        getParityFlipErrors();
        t1 = performance.now();
        console.log("iterate parityFlip took " + (t1 - t0) + " milliseconds.");
        t0 = performance.now();
        getDangleErrors();
        t1 = performance.now();
        console.log("iterate getDangleErrors took " + (t1 - t0) + " milliseconds.");
        client.invoke("incrementProgress", {
            id: "road-geom-errors",
            value: 1
        });
        return roadErrors;
    }
    exports.getRoadErrors = getRoadErrors;
    var nonNullGeom = function (f) {
        if (f.geometry == null) {
            roadErrors.nullGeoms.push(f);
            return false;
        }
        return true;
    };
    var singlePartGeom = function (f) {
        if (f.geometry.paths.length > 1) {
            // f.attributes.ERROR = "Multipart geometry";
            // f.error = "multipart-geometry";
            roadErrors.multiPartGeoms.push(f);
            return false;
        }
        return true;
    };
    var getVectorFlipErrors = function () {
        // Check for directionality flips,
        Object.keys(vectorFlipErrors).forEach(function (roadName) {
            var _a, _b;
            var starts = vectorFlipErrors[roadName].starts.filter(function (pair, idx) {
                return vectorFlipErrors[roadName].starts.indexOf(pair) !== idx;
            });
            if (starts.length > 1) {
                (_a = roadErrors.vectorFlips).push.apply(_a, starts.map(function (pair) { return JSON.parse(pair); }));
            }
            var ends = vectorFlipErrors[roadName].ends.filter(function (pair, idx) {
                return vectorFlipErrors[roadName].ends.indexOf(pair) !== idx;
            });
            if (ends.length > 1) {
                (_b = roadErrors.vectorFlips).push.apply(_b, ends.map(function (pair) { return JSON.parse(pair); }));
            }
        });
    };
    var getParityFlipErrors = function () {
        Object.keys(segments).forEach(function (roadName) {
            segments[roadName].forEach(function (segA) {
                for (var _i = 0, _a = segA.to; _i < _a.length; _i++) {
                    var sIdx = _a[_i];
                    var segB = segments[roadName][sIdx];
                    if ((segA.endLeft !== "zero" &&
                        segB.startLeft !== "zero" &&
                        segA.endLeft !== segB.startLeft) ||
                        (segA.endRight !== "zero" &&
                            segB.startRight !== "zero" &&
                            segA.endRight !== segB.startRight)) {
                        roadErrors.parityFlips.push(JSON.parse(segA.end));
                    }
                }
            });
        });
    };
    var getDuplicate = function (fGeom, gGeom) {
        if (fGeom.paths.length !== gGeom.paths.length) {
            return false;
        }
        var duplicate = fGeom.paths.every(function (fPath, idx) {
            if (fPath.length !== gGeom.paths[idx].length) {
                return false;
            }
            return fPath.every(function (vertex, jdx) {
                if (vertex[0] !== gGeom.paths[idx][jdx][0] ||
                    vertex[1] !== gGeom.paths[idx][jdx][1]) {
                    return false;
                }
            });
        });
        duplicate &&
            roadErrors.duplicateGeoms.push(JSON.parse(JSON.stringify(fGeom)));
        return duplicate;
    };
    var getOverlap = function (fGeom, gGeom) {
        var _a, _b, _c;
        var matchingVertices = [];
        var fPath = fGeom.paths[0];
        var gPath = gGeom.paths[0];
        // iterate vertices and look for a match between the two paths
        for (var j = 0; j < fPath.length; j++) {
            var vertex = fPath[j];
            for (var k = 0; k < gPath.length; k++) {
                if (vertexMatch(vertex, gPath[k])) {
                    matchingVertices.push({ idxs: [j, k], vertex: vertex });
                }
            }
        }
        // if there are no matching vertices
        if (matchingVertices.length === 0) {
            return false;
        }
        // if they share an endpoint
        else if (matchingVertices.length === 1 &&
            (vertexMatch(fPath[0], matchingVertices[0].vertex) ||
                vertexMatch(fPath[fPath.length - 1], matchingVertices[0].vertex)) &&
            (vertexMatch(gPath[0], matchingVertices[0].vertex) ||
                vertexMatch(gPath[gPath.length - 1], matchingVertices[0].vertex))) {
            return false;
        }
        else if (matchingVertices.length === 2 &&
            (vertexMatch(fPath[0], matchingVertices[0].vertex) ||
                vertexMatch(fPath[fPath.length - 1], matchingVertices[0].vertex)) &&
            (vertexMatch(gPath[0], matchingVertices[0].vertex) ||
                vertexMatch(gPath[gPath.length - 1], matchingVertices[0].vertex)) &&
            (vertexMatch(fPath[0], matchingVertices[1].vertex) ||
                vertexMatch(fPath[fPath.length - 1], matchingVertices[1].vertex)) &&
            (vertexMatch(gPath[0], matchingVertices[1].vertex) ||
                vertexMatch(gPath[gPath.length - 1], matchingVertices[1].vertex)) &&
            (fPath.length > 2 || gPath.length > 2)) {
            return false;
        }
        else {
            var sequences = {
                fSequence: [],
                gSequence: [],
                vSequence: []
            };
            for (var _i = 0, matchingVertices_1 = matchingVertices; _i < matchingVertices_1.length; _i++) {
                var _d = matchingVertices_1[_i], idxs = _d.idxs, vertex = _d.vertex;
                if (((_a = sequences.fSequence[sequences.fSequence.length - 1]) === null || _a === void 0 ? void 0 : _a.indexOf(idxs[0] - 1)) >= 0 &&
                    (((_b = sequences.gSequence[sequences.gSequence.length - 1]) === null || _b === void 0 ? void 0 : _b.indexOf(idxs[1] - 1)) >= 0 ||
                        ((_c = sequences.gSequence[sequences.gSequence.length - 1]) === null || _c === void 0 ? void 0 : _c.indexOf(idxs[1] + 1)) >= 0)) {
                    sequences.fSequence[sequences.fSequence.length - 1].push(idxs[0]);
                    sequences.gSequence[sequences.gSequence.length - 1].push(idxs[1]);
                    sequences.vSequence[sequences.vSequence.length - 1].push(vertex);
                }
                else {
                    sequences.fSequence.push([idxs[0]]);
                    sequences.gSequence.push([idxs[1]]);
                    sequences.vSequence.push([vertex]);
                }
            }
            sequences.vSequence.forEach(function (sequence) {
                if (sequence.length === 1) {
                    roadErrors.overlappingGeoms.points.push(sequence[0]);
                }
                else {
                    roadErrors.overlappingGeoms.lines.push(sequence);
                }
            });
            return true;
        }
    };
    function getIntersecting(fGeom, gGeom) {
        var fPath = fGeom.paths[0];
        var gPath = gGeom.paths[0];
        for (var i = 1; i < fPath.length; i++) {
            var fSegment = [fPath[i - 1], fPath[i]];
            for (var k = 1; k < gPath.length; k++) {
                var gSegment = [gPath[k - 1], gPath[k]];
                if (
                // if the endpoints dont match
                !(
                // if any of the endpoints match
                ((vertexMatch(fSegment[0], gSegment[0]) &&
                    !vertexMatch(fSegment[1], gSegment[1])) ||
                    (vertexMatch(fSegment[0], gSegment[1]) &&
                        !vertexMatch(fSegment[1], gSegment[0])) ||
                    (vertexMatch(fSegment[1], gSegment[0]) &&
                        !vertexMatch(fSegment[0], gSegment[1])) ||
                    (vertexMatch(fSegment[1], gSegment[1]) &&
                        !vertexMatch(fSegment[0], gSegment[0]))))) {
                    var intersection = intersects(fSegment[0][0], fSegment[0][1], fSegment[1][0], fSegment[1][1], gSegment[0][0], gSegment[0][1], gSegment[1][0], gSegment[1][1]);
                    if (intersection.length) {
                        roadErrors.intersectingGeoms.push(intersection);
                    }
                }
            }
        }
    }
    function compileSegmentEndpoints(f) {
        var geom = f.geometry;
        var start = JSON.stringify(geom.paths[0][0]);
        var end = JSON.stringify(geom.paths[geom.paths.length - 1][geom.paths[geom.paths.length - 1].length - 1]);
        endpoints.push(end, start);
        var roadName = setFullRoadName(f);
        if (roadName in vectorFlipErrors) {
            vectorFlipErrors[roadName].starts.push(start);
            vectorFlipErrors[roadName].ends.push(end);
        }
        else {
            vectorFlipErrors[roadName] = {
                starts: [start],
                ends: [end]
            };
        }
        if (!(roadName in segments)) {
            segments[roadName] = [];
        }
        var segA = __assign({
            start: start,
            end: end,
            to: [],
            from: []
        }, getSegmentParities(f));
        segments[roadName].forEach(function (segB, idx) {
            if (segB.end === segA.start) {
                segB.to.push(segments[roadName].length);
                segA.from.push(idx);
            }
            if (segB.start === segA.end) {
                segA.to.push(idx);
                segB.from.push(segments[roadName].length);
            }
        });
        segments[roadName].push(segA);
    }
    var vertexMatch = function (v1, v2) {
        return v1[0] === v2[0] && v1[1] === v2[1];
    };
    var getSegmentParities = function (f) {
        var addresses = {
            startLeft: Number(f.attributes[config.roadFields.fromLeft]),
            startRight: Number(f.attributes[config.roadFields.fromRight]),
            endLeft: Number(f.attributes[config.roadFields.toLeft]),
            endRight: Number(f.attributes[config.roadFields.toRight])
        };
        var parity = {
            startLeft: "",
            startRight: "",
            endLeft: "",
            endRight: ""
        };
        Object.keys(addresses).forEach(function (address) {
            parity[address] = getParity(addresses[address]);
        });
        return parity;
    };
    function getParity(address) {
        if (address === 0) {
            return "zero";
        }
        else if (address % 2 === 1) {
            return "odd";
        }
        else {
            return "even";
        }
    }
    var intersects = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var det;
        var gamma;
        var lambda;
        det = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
        if (det === 0) {
            return [];
        }
        else {
            lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
            gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;
            if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
                return [x1 + lambda * (x2 - x1), y1 + lambda * (y2 - y1)];
            }
            return [];
        }
    };
    function getDangleErrors() {
        var _a;
        var t0 = performance.now();
        var uniqueEndpoints = getUniqueEndpoints();
        var t1 = performance.now();
        console.log("get uniqueEndpoints took " + (t1 - t0) + " milliseconds.");
        t0 = performance.now();
        var counts = {};
        uniqueEndpoints.forEach(function (v) {
            var coords = JSON.parse(v);
            for (var _i = 0, validGeoms_2 = validGeoms; _i < validGeoms_2.length; _i++) {
                var roadGeom = validGeoms_2[_i];
                if (pointInExtent(coords, roadGeom.extent)) {
                    for (var i = 1; i < roadGeom.paths[0].length; i++) {
                        var segment = [roadGeom.paths[0][i - 1], roadGeom.paths[0][i]];
                        if (distToSegment(coords, segment) < 5) {
                            counts[v] = counts[v] ? counts[v] + 1 : 1;
                            break;
                        }
                    }
                }
            }
        });
        t1 = performance.now();
        console.log("iterate get disttosegment counts took " + (t1 - t0) + " milliseconds.");
        t0 = performance.now();
        (_a = roadErrors.dangles).push.apply(_a, Object.keys(counts)
            .filter(function (v) {
            return counts[v] > 1;
        })
            .map(function (v) {
            return JSON.parse(v);
        }));
        t1 = performance.now();
        console.log("iterate get the ones that appear more thatn once took " +
            (t1 - t0) +
            " milliseconds.");
    }
    function getUniqueEndpoints() {
        // let endpoints =[];
        var endpointCounts = endpoints.reduce(function (counts, v) {
            counts[v] = counts[v] ? counts[v] + 1 : 1;
            return counts;
        }, {});
        return Object.keys(endpointCounts).filter(function (v) {
            return endpointCounts[v] === 1;
        });
    }
    function dist2(_a, _b) {
        var x1 = _a[0], y1 = _a[1];
        var x2 = _b[0], y2 = _b[1];
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }
    function distToSegment(p, segment) {
        var l2 = dist2(segment[0], segment[1]);
        if (l2 === 0) {
            return Math.sqrt(dist2(p, segment[0]));
        }
        var t = ((p[0] - segment[0][0]) * (segment[1][0] - segment[0][0]) +
            (p[1] - segment[0][1]) * (segment[1][1] - segment[0][1])) /
            l2;
        t = Math.max(0, Math.min(1, t));
        return Math.sqrt(dist2(p, [
            segment[0][0] + t * (segment[1][0] - segment[0][0]),
            segment[0][1] + t * (segment[1][1] - segment[0][1])
        ]));
    }
    var setFullRoadName = function (f) {
        return config.roadFields.roadNames
            .map(function (fn) {
            return f.attributes[fn] == null ? "" : f.attributes[fn];
        })
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    };
    var overlappingExtents = function (a, b) {
        return !(a.xmin > b.xmax ||
            a.xmax < b.xmin ||
            a.ymin > b.ymax ||
            a.ymax < b.ymin);
    };
    var overlappingExtentsBuffered = function (a, b) {
        return !(a.xmin - 5 > b.xmax ||
            a.xmax < b.xmin - 5 ||
            a.ymin - 5 > b.ymax ||
            a.ymax < b.ymin - 5);
    };
    // const findDanglesNearest = (fGeom: esri.Polyline, gGeom: esri.Polyline)=>{
    //   let ends = [];
    //   const fPath = fGeom.paths[0];
    //   const gPath = gGeom.paths[0];
    //   let fStart = fPath[0];
    //   let fEnd = fPath[fPath.length-1];
    //   let gStart =  gPath[0];
    //   let gEnd = gPath[gPath.length-1];
    //   if (!(vertexMatch(fStart,gStart)||vertexMatch(fStart,gEnd))){
    //     ends.push(0);
    //   }
    //   if (!(vertexMatch(fEnd,gStart)||vertexMatch(fEnd,gEnd))){
    //     ends.push(1);
    //   }
    //   if (!(vertexMatch(gStart,fStart)||vertexMatch(gStart,fEnd))){
    //     ends.push(2);
    //   }
    //   if (!(vertexMatch(gEnd,fStart)||vertexMatch(gEnd,fEnd))){
    //     ends.push(3);
    //   }
    //   for (let i=1;i<gPath.length;i++){
    //     if (ends.includes(0)&&distToSegment({x:fStart[0],y:fStart[1]},{x:gPath[i-1][0],y:gPath[i-1][0]},{x:gPath[i][0],y:gPath[i][0]})<5){
    //       roadErrors.dangles.push(fStart);
    //     }
    //     if (ends.includes(1)&&distToSegment({x:fEnd[0],y:fEnd[1]},{x:gPath[i-1][0],y:gPath[i-1][1]},{x:gPath[i][0],y:gPath[i][1]})<5){
    //       roadErrors.dangles.push(fEnd);
    //     }
    //   }
    //   for (let i=1;i<fPath.length;i++){
    //     if (ends.includes(2)&&distToSegment({x:gStart[0],y:gStart[1]},{x:fPath[i-1][0],y:fPath[i-1][0]},{x:fPath[i][0],y:fPath[i][0]})<5){
    //       roadErrors.dangles.push(gStart);
    //     }
    //     if (ends.includes(3)&&distToSegment({x:gEnd[0],y:gEnd[1]},{x:fPath[i-1][0],y:fPath[i-1][1]},{x:fPath[i][0],y:fPath[i][1]})<5){
    //       roadErrors.dangles.push(gEnd);
    //     }
    //   }
    // }
    var pointInExtent = function (v, r) {
        return !(v[0] - 5 > r.xmax ||
            v[0] < r.xmin - 5 ||
            v[1] - 5 > r.ymax ||
            v[1] < r.ymin - 5);
    };
});
