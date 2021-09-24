// const { SyncHook } = 
const {
  SyncHook,
  AsyncParallelHook,
} = require('./lib/index');

class Order {
  constructor() {
    // 实例化SyncHook（同步钩子）和AsyncParallelHook（异步钩子）
    this.hooks = {
      goods: new SyncHook(['goodsId', 'number']),
      consumer: new AsyncParallelHook(['userId', 'orderId'])
    };
  }

  queryGoods(goodsId, number) {
    // 调用同步钩子
    console.dir(this.hooks.goods.call);
    this.hooks.goods.call(goodsId, number);
  }

  consumerInfoPromise(userId, orderId) {
    // 调用异步钩子
    this.hooks.consumer.promise(userId, orderId).then(() => {
      console.log('consumerInfoPromise then---');
    });
  }
}
const order = new Order();

// 注册QueryPlugin同步钩子
order.hooks.goods.tap('QueryPlugin', (goodsId, number) => {
  console.info('QueryPlugin', goodsId, number);
  return {
    goodsId,
    number
  };
});
// order.queryGoods('XXXX', 10);

// // 注册LoggerPlugin同步钩子
// order.hooks.goods.tap('LoggerPlugin', (goodsId, number) => {
//   console.info('LoggerPlugin', goodsId, number);
//   return {
//     goodsId,
//     number
//   };
// });

// 注册异步钩子
order.hooks.consumer.tapPromise('PayPlugin', (userId, orderId) => {
  return Promise.resolve({
    userId,
    orderId
  });
});

order.consumerInfoPromise('HHH', 123456789)

