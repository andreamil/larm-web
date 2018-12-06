const proxy = [
  {
    context: '/api',
    target: 'https://larm-backend.herokuapp.com',
    pathRewrite: {'^/api' : ''}
  }
];''
module.exports = proxy;
