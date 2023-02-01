#!/usr/bin/env bash

set -e

npm run docs:build

cd docs/.vitepress/dist

echo hello > README.md

git init

git add .

git commit -m '自动部署'

git remote add origin https://github.com/lovebailin/lovebailin.github.io.git

git branch -m master main

git push -f origin main



cd -

rm -rf docs/.vitepress/dist

