import { getElements } from "../utils/getElement";

import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { ConnectionPoints } from "./ConnectionPoints";
import { Description } from "./Description";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Scale } from "./Scale";
import { Shape } from "./Shape";
import { TrimmedCurve } from "./TrimmedCurve";
import { Text } from "./Text";
import { getDrawable } from "../utils/callDrawOnChildren";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { collectMissingParts } from "../utils/findMissing";

/**
 * This element is an annotation primitive to represent a label on a P&ID.
 * An InsulationSymbol element inherits elements and attributes from the base type ‘AnnotationItem’.
 * See ‘AnnotationItem’ for the definitions of the inherited contents.
 */
export class InsulationSymbol {
    element: Element;
    isChild = true;

    presentation: Presentation[];
    extent: Extent[];
    persistentID: PersistentID[];
    position: Position[];
    scale: Scale[];
    circle: Circle[];
    compositeCurve: CompositeCurve[];
    connectionPoints: ConnectionPoints[];
    ellipse: Ellipse[];
    line: Line[];
    polyLine: PolyLine[];
    shape: Shape[];
    trimmedCurve: TrimmedCurve[];
    bsplineCurve: BsplineCurve[];
    text: Text[];
    description: Description[];
    genericAttributes: GenericAttributes[];
    history: History[];
    association: Association[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    revision: StringAttribute;
    status: StringAttribute;

    constructor(element: Element) {
        this.element = element;
        console.log("insulation");

        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.position = getElements(element, "Position", Position);
        this.scale = getElements(element, "Scale", Scale);
        this.circle = getElements(element, "Circle", Circle);
        this.compositeCurve = getElements(element, "CompositeCurve", CompositeCurve);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.bsplineCurve = getElements(element, "BsplineCurve", BsplineCurve);
        this.text = getElements(element, "Text", Text);
        this.description = getElements(element, "Description", Description);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.history = getElements(element, "History", History);
        this.association = getElements(element, "Association", Association);

        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");

        collectMissingParts(this.element, this);
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

        if (this.componentName.value) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                const x = this.position[0].location[0].x.value;
                const y = this.position[0].location[0].y.value;
                //console.log("Drawing shape", this.componentName.value);
                if (typeof (shapeCatalogItem as any).draw === "function") {
                    (shapeCatalogItem as any).draw(
                        unit,
                        pageOriginX,
                        pageOriginY,
                        x + offsetX,
                        y + offsetY
                    );
                }
            }
        }
    }
}
