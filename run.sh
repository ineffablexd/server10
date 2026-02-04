#!/bin/bash

SERVER_CMD="npm run dev"
BOT_CMD="./valentine_bot.sh"

echo "Starting server + telegram bot..."

while true; do
  echo "Launching server..."
  $SERVER_CMD &
  SERVER_PID=$!

  echo "Launching telegram bot..."
  $BOT_CMD &
  BOT_PID=$!

  # Wait until either process exits
  wait -n $SERVER_PID $BOT_PID

  echo "One process crashed. Restarting both in 3 seconds..."

  kill $SERVER_PID 2>/dev/null
  kill $BOT_PID 2>/dev/null

  sleep 3
done
