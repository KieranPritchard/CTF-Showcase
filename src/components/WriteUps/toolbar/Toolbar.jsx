/**
 * Toolbar component: a flexible container for action buttons, inputs, or other controls.
 * Supports both vertical stacking on small screens and horizontal layout on larger screens.
 */
function Toolbar({ children }) {
    return (
        <div
            className="
                bg-[#121A22]          /* Dark background matching site's theme */
                py-4 px-2             /* Padding for spacing inside the toolbar */
                rounded-lg            /* Rounded corners for aesthetics */
                flex                  /* Use flexbox for layout */
                flex-col sm:flex-row   /* Stack vertically on small screens, horizontally on medium+ */
                justify-center         /* Center children horizontally */
                sm:gap-2 gap-1         /* Gap between children: smaller on mobile */
                items-center           /* Vertically center children */
            "
        >
            {/* Render any child elements passed to the toolbar */}
            {children}
        </div>
    );
}

export default Toolbar;