export class Subscriptions {
  public documents = [
    {
      language: "typescriptreact",
      scheme: "file",
    },
  ];

  public subscriptions: { dispose(): any }[] = [];

  public getSubscriptions() {
    return this.subscriptions;
  }

  public setSubscriptions(subscription: { dispose(): any }) {
    this.subscriptions.push(subscription);
  }
}
