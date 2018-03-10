import cashMachine from './cash-machine';

console.log('INIT WORKERS');
onmessage = function (e) {
  console.log('GOT MESSAGE');
  const {
    action,
    payload
  } = e.data;
  if (action === 'GET_NOTES') {
    const result = cashMachine.apply(null, payload);
    console.log(result.length);
    console.log();
  }
}