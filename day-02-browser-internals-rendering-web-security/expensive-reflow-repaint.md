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




When Repaint Occurs:
----

* Color or style change:
Changing color, background-color, border, box-shadow and other styles that don't affect size or position.
Example: changing element background color or text.

* Opacity change:
Changing opacity doesn't affect layout, but causes Repaint to update display.
Example: decreasing element opacity.

* Background addition and change:
Changing background-image, background-position, background-size and other background-related properties.
Example: changing background image or its position.

* Fonts and text styles:
Changing font-family, font-size, line-height, letter-spacing, if it doesn't affect positioning.
Example: changing letter spacing (letter-spacing).

* Border style change:
Changing element border color or width, if it doesn't affect its sizes.
Example: changing block border color or thickness.





Minimizing Reflow & Repaint
-------
* Minimize DOM changes:
Avoid frequent DOM structure changes, as this always causes Reflow.
Try to group DOM changes in one cycle, rather than calling them one by one.

* Use requestAnimationFrame:
Use requestAnimationFrame to synchronize visual changes with screen repaint to avoid unnecessary repaints.


* Use CSS transformations instead of size changes:
If possible, use transform and opacity for animation instead of changing sizes or position to avoid Reflow.
Example: using transform: translate() instead of changing top and left.

* Use document fragments:
When adding multiple elements to DOM, use Document Fragment to prevent multiple Reflow calls.

* Hide elements before changing their sizes:
If you want to change element size or position, hide them first, change parameters, then show back. This prevents unnecessary Reflow during process.

* Using will-change:
Use will-change property to indicate to browser in advance which elements will change. This helps browser optimize rendering.
