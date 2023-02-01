#!/usr/bin/env bash


echo "选择此次发版类型?"
select type in fix feat;
do
    break
done
 
read  -p "请输入此次发版的内容: " content



npm run docs:build

cd docs/.vitepress/dist

echo hello > README.md

git init

git add .


git commit -m "$type: $content"

git remote add origin https://github.com/lovebailin/lovebailin.github.io.git

git branch -m master main

git push -f origin main

cd -

rm -rf docs/.vitepress/dist

