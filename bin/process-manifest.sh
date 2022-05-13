#!bin/bash

# Read meta file
str="`cat ./src/manifest.json`"

# Read name
name="`cat ./src/config/name`"

# Read version
version="`cat ./src/config/version | cut -d "." -f1`"

# Substitute data
str=${str/__NAME__/$name}
str=${str/__VERSION__/$version}

# Write output to stdout
echo $str
