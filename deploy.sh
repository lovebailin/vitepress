#!/usr/bin/env bash

set -e

npm run docs:build

cd docs/.vitepress/dist

git init

git add .

git commit -m '自动部署'

git push -f https://github.com/lovebailin/lovebailin.github.io.git main

cd -

rm -rf docs/.vitepress/dist

