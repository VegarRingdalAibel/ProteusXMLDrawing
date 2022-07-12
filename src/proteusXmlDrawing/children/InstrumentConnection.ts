import { Component } from "react";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { CenterLine } from "./CenterLine";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Label } from "./Label";
import { Line } from "./Line";
import { PipingComponent } from "./PipingComponent";
import { PolyLine } from "./PolyLine";
import { Shape } from "./Shape";

/**
 *This represents a connection for purposes of instrumentation to a process line.  
 Even though this is a topological break this doesn’t terminate the PipingNetworkSegment 
 (see PipingNetworkSegment Topology (Connection element))
 *
 *An InstrumentConnection element inherits elements and attributes from the base type ‘PlantItem’.  
 See ‘PlantItem’ for the definitions of the inherited contents.
 */
export class InstrumentConnection {
    public readonly isChild = true;
    public readonly element: Element;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly shape: Shape[];
    public readonly circle: Circle[];
    public readonly ellipse: Ellipse[];

    // attributes

    constructor(element: Element) {
        this.element = element;

        // children -> plantItem
        // Presentation
        // Extent
        // PersistentID
        // Extent
        // Position
        // Scale
        // Surface
        this.circle = getElements(element, "Circle", Circle);
        // CompositeCurve
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        // TrimmedCurve
        // BsplineCurve
        // ConnectionPoints
        // PConnectionPoints
        // Identifier
        // Description
        // Weight
        // Material
        // MaterialDescription
        // ModelNumber
        // Supplier
        // Manufacturer
        // GenericAttributes
        // Association
        // History

        // attributes -> plantItem
        // ID
        // TagName
        // Specification
        // StockNumber
        // ComponentClass
        // ComponentName
        // ComponentType
        // Revision
        // Status
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });
    }
}
