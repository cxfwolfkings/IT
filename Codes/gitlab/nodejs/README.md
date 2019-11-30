# Sample NodeJS Project for GitLab Runner

This is NodeJS project that accompanies my guest
[blog post](https://about.gitlab.com/2016/03/01/gitlab-runner-with-docker/)
on Gitlab.com.

It contains two independent modules to be tested with GitLab Runner.

### Running the tests

To run test locally, first start a PostgreSQL database.

To start a db instance with Docker:
```
docker run \
  --name postgres-db \
  --publish=5432:5432 \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_USER=testuser \
  -d postgres:9.5.0
```

Then the db will be available at the following address:
> postgres://testuser:123456@localhost:5432/postgres

To start the tests:
```
DB_USER=testuser \
DB_PASS=123456 \
DB_HOST=localhost:5432  \
node ./specs/start.js
```
