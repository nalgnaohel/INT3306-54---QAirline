FROM golang:1.23.2-alpine as builder

# Set name of env = config, value = docker
ENV config=docker

WORKDIR /app

COPY ./ /app

#Check what is the Golang version
RUN go version
RUN go install github.com/githubnemo/CompileDaemon@latest

RUN go mod download

#Running stage 
FROM golang:1.23.2-alpine as runner

RUN go install github.com/githubnemo/CompileDaemon@latest

COPY --from=builder ./app ./app

WORKDIR /app
ENV config=docker

EXPOSE 8080

#Entrypoint commnad to run the server for CompileDaemon
ENTRYPOINT CompileDaemon --build="go build -o cmd/main.go" --command=./main 