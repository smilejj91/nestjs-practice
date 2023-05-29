FROM node:19-alpine as builder

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "ci"]

COPY ["tsconfig.build.json", "tsconfig.json", "./"]
COPY ["nest-cli.json", "nest-cli.json", "./"]
COPY ["src/", "./src/"]
RUN ["npm", "run", "build"]

RUN ["/bin/sh", "-c", "find . ! -name dist ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

FROM node:19-alpine as production
WORKDIR /opt/app
COPY --from=builder /opt/app ./
ENTRYPOINT ["node", "dist/main"]
EXPOSE 8080/tcp

