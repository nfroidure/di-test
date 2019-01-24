# di-test

Small example of the [`Knifecycle`](https://github.com/nfroidure/knifecycle) DI tool usage.

To test it:
```sh
npm i
docker-compose up&
npm run command -- -c printTime
npm run command -- -c printRows
npm run command -- -c insertRows --path='fixtures/test.csv'
npm run command -- -c putToFTP --path='fixtures/test.csv'
```

You can read [the slides](https://slides.com/nfroidure/javascript_dependency_injection/).
