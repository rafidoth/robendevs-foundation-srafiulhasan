* In critical rendering path, in layout stage the calculation of position, size and other properties of different DOM nodes happen. This is bit time consuming and also on any change in DOM Tree this layout stage happens again (this is reflow).



* Reflow also makes all the descendant stages happens again. So, Reflow also trigger Repaint and this also trigger re-composite.


When Reflow Occurs:
--- 
* Element size change:
  Changing width, height, margin, padding and other properties.
  Example: changing block width or increasing content height.
  Document structure change:

*  Adding, removing or changing elements in DOM.
    Example: inserting new element or removing existing element.
    Element position change:

* Changing position, top, left, right, bottom, z-index properties.
  Example: changing position of element with absolute or relative positioning.
  Font or font size change:

* Changing font styles, e.g., font-size, font-family, line-height.
  Example: changing text size in block.
  Element visibility or display change:

* Changing display (e.g., from none to block or vice versa).
  Example: hiding or showing elements.


* Animations and transformations:
  Although animations such as transform don't always cause Reflow, if animation changes layout, it can cause Reflow.


