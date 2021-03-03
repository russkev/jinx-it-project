#!/bin/bash

echo "Switching to master"
git checkout master
echo "Deploying backend"
git subtree push --prefix src/backend dokku master
echo "Deploying frontend"
git push
echo "Finished"
