#!/bin/sh
# Source: https://travis-ci.community/t/travis-conditional-on-branch-after-success/7402

if [[ "$TRAVIS_BRANCH" != "master" ]]; then
  echo "We're not on the master branch."
  exit 0
fi