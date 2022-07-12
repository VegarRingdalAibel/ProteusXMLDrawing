import { collectMissingParts } from "../utils/findMissing";

/**
 * This element is used to capture the structure of an identifier such as a TagName.  Not usually used.
 */
export class Identifier {
    isChild = true;
    element: Element;

    constructor(element: Element) {
        this.element = element;

        // IdentifierElement

        // Purpose

        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        // not implemented
        // not every element will have primitives or children
    }
}
