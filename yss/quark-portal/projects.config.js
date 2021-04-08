module.exports = [
  {
    name: 'processCenter',
    main: 'http://192.168.102.105:8082/js/app.js',
    store: '',
    path: ['/processCenter'],
  },
  {
    name: 'lugia',
    main: 'http://localhost:8086/index.js',
    dependencies: ["http://localhost:8086/vendors.js", "http://localhost:8086/vendors.383c45f0.css", "http://localhost:8086/index.5277382f.css"],
    store: '',
    path: ["/lugia"]
  },
];
