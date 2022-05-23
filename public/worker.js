this.addEventListener('message', function ({ data }) {
  const { payload, args, action } = data;
  const factory = new Function(args, action);
  this.postMessage(factory(payload, factory));
});
