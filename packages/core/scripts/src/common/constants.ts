const EXIT_CODES = {
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
