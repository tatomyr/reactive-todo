#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
# Clear color
NC='\033[0m'

# Retrieve arguments
port='8085'
root='.'
while getopts "p:r:" arg; do
  case $arg in
    p) port=$OPTARG ;;
    r) root=$OPTARG ;;
    *) exit 1 ;;
  esac
done
echo
echo -e "[E2E]  Starting http://localhost:${CYAN}$port${NC} inside ${CYAN}$root${NC} folder"
echo

# Start testing server
cd $root && npx static-server -p $port -c "*" &
# Run tests with Cypress
npx cypress run --config baseUrl=http://localhost:$port
# Catch the most recent command response
RESULT=$?
# Find the testing server PID
echo `ps -A | grep "static-server -p $port" | grep -v grep | awk '{print $1}'`
test_server_PID=`ps -A | grep "static-server -p $port" | grep -v grep | awk '{print $1}'`
# Kill the process
kill -9 $test_server_PID
# Exit with error if testing has failed
$RESULT || exit $RESULT
