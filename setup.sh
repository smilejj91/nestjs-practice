#!/bin/bash

npm i -g @nestjs/cli

read -p "Create new project? [y/n]" create_answer

if [ $create_answer == 'y' ]; then
  read -p "Please insert new project name: " project_name
  nest new $project_name
fi 

# nest g resources $module_name
