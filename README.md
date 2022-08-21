### Isolate Lab

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=bugs)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_v8isolate-lab&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=stanimirovv_v8isolate-lab)

Manage and Run V8 Isolates as a service via a Restful API

As of now, mostly fun and hobby project.

### Idea

### Local setup

You need to have installed sqlite and isolated-vm https://github.com/laverdet/isolated-vm

```
# OsX
brew install sqlite

# Ubuntu/Debian:
sudo apt install sqlite3

```

Setup and validation:

```
npm i
npm test
```

### Container setup

Docker is supported, when persistency is supported extra files (like docker compose) will be added.
The image itself isn't optimized as of now - all dependencies are installed instead of only the prod ones.

Build:

```
docker build -f Dockerfile -t isolate-lab .
```

Run:

```
docker run -p 3000:3000 -it isolate-lab
```

### Contributing

This is a fun hobby project so chances are if you want to contribute something it will get approved and merged.

There are git hooks for linting and testing, please use them.

Manual commands:

```
npm run lint
```

```
npm test
```

Please make sure your code is covered by tests.
Due to the casual nature of the project I don't expect a 100%unit testing coverage, but at least the tests should be covered by the integration suite.

### Work Queue

- Use dotenv for config
- Allow user specific tokens for auth
- Optimize Docker Image
