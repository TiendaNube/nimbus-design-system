const EXIT_CODES = {
  /**
   * The command ran but could not finish its job (e.g., an RC was not published)
   */
  FAILURE: 1,
  /**
   * Ctrl+C
   */
  SIGINT: 130,
  /**
   * Termination signal
   */
  SIGTERM: 143,
} as const;

export { EXIT_CODES };
