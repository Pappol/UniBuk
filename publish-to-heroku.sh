#!/bin/bash
YOUR_HEROKU_APP=unibuk
DOCKER_IMAGE_ID=$(docker inspect registry.heroku.com/$YOUR_HEROKU_APP/web --format={{.Id}})

curl --netrc -X PATCH https://api.heroku.com/apps/$YOUR_HEROKU_APP/formation \
  -d '{                                                                               
  "updates": [
    {
      "type": "web",
      "docker_image": "'"$DOCKER_IMAGE_ID"'"
    }
  ]
}' \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases"
