# Nodejs server example

Tiny nodejs webserver that prints information like local server ip.

## Paths

| Method | path      | descriptions |
| ------ | --------- | ------------ |
| Get    | /         | print message. |
| Get    | /users    | print user array. |
| Get    | /infos    | print local ip of server. |

## Build new docker image for this server
````
docker build . -t test_node_server:0.0.1
````

## Run docker container from generated image
````
docker run --rm -p 80:8085 test_node_server:0.0.1
````
