# Using Docker Compose

Ensure you are at backend folder

### starting & stopping all microservices

```BASH
    docker compose up -d
    docker compose down
```

### removing all images

```BASH
    docker image prune -a
```

### for clearing memory (Windows)

[How can I stop `vmmem` process?](https://superuser.com/questions/1645056/how-can-i-stop-vmmem-process)

```BASH
    wsl --shutdown
```
