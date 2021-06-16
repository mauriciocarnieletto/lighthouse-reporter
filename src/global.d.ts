declare module "lighthouse/lighthouse-core" {
  /**
   * Run Lighthouse.
   * @param {string=} url The URL to test. Optional if running in auditMode.
   * @param {LH.Flags=} flags Optional settings for the Lighthouse run. If present,
   *   they will override any settings in the config.
   * @param {LH.Config.Json=} configJSON Configuration for the Lighthouse run. If
   *   not present, the default config is used.
   * @param {Connection=} userConnection
   * @return {Promise<LH.RunnerResult|undefined>}
   */
  function lighthouse(
    url: string,
    config: LH.Config
  ): Promise<LH.RunnerResult | undefined>;
  export default lighthouse;
}
