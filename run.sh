docker build . -t snake

docker stop snake-container
docker rm snake-container
docker run -d --name snake-container -p 8321:80 snake
