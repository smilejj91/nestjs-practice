#!/bin/bash

cd pylon-api

# for tutorial
npm install --save @nestjs/mongoose mongoose
npm install --save @nestjs/config
npm install --save class-validator class-transformer
npm install --save @nestjs/axios axios
npm install --save nest-winston winston
npm install --save winston-daily-rotate-file
nest g resource Modules
