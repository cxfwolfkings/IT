This requires GitLab Runner using Docker Executor in Privileged mode.

```
[[runners]]
  name = "runner"
  url = "https://gitlab.com/ci"
  token = "TOKEN"
  executor = "docker"
  [runners.docker]
    privileged = true
```
