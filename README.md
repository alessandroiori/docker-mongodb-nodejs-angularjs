# vagrant-docker-nodejs-mongodb

Creazione immagine "nome-img" indicando il path della cartella contenente il Dockerfile 
In questo esempio Dockerfile presente nella cartella ".":
$ docker build -t nome-img .

Creazione contenitori definiti nel file docker-compose.yml
Eseguito nella cartella contenente il file docker-compose.yml:
$ docker-compose up

Visualizzazione contenitori presenti nell'ambiente:
$ docker ps

Visualizzazione immagini presenti nell'ambiente:
$ docker images


Comandi da eseguire in seguenza per ripulire ambiente:

1.Stop di tutti i contenitori:
$ docker stop $(docker ps -a -q)

2.Rimozione di tutti i contenitori:
$ docker rm $(docker ps -a -q)

3.Rimozione di tutti le immagini
$ docker rmi $(docker images -q)





Client curl da eseguire in uno script o meno:
$ curl -i -H "Accept: application/json" "localhost:3000"
