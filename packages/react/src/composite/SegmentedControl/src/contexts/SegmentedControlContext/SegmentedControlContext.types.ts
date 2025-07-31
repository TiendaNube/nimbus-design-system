export interface SegmentedControlContextValue {
  /**
   * Register a button with its unique identifier
   * @param id The unique identifier for the button
   */
  registerButton: (id: string) => void;
  /**
   * Unregister a button by its identifier
   * @param id The identifier of the button to unregister
   */
  unregisterButton: (id: string) => void;
  /**
   * Toggle a segment's state by ID
   * @param id The unique identifier of the segment to toggle
   */
  toggleSegment: (id: string) => void;
  /**
   * Check if a segment is currently selected by ID
   * @param id The unique identifier of the segment to check
   */
  isSelected: (id: string) => boolean;
  /**
   * Whether buttons should span full width
   */
  fullWidth: boolean;
}
