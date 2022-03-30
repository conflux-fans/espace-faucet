#!/bin/sh
npm run build
cd ./dist
git init
git branch -m gh-pages
echo "efaucet.confluxnetwork.org" >> CNAME
git add .
git commit -m "Automatic deploy"
git remote add origin git@github.com:conflux-fans/espace-faucet.git
git push origin gh-pages -f