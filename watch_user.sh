#!/bin/bash

BOT_TOKEN="8521980411:AAEND2x3mFbhHRyJMWttAg2slvFi5iI0c_s"
CHAT_ID="-5296141912"
WATCH_DIR="data/users"

send_msg () {
  curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d chat_id="$CHAT_ID" \
    -d text="$1" \
    -d parse_mode="Markdown" >/dev/null
}

inotifywait -m -e create --format '%f' "$WATCH_DIR" | while read folder
do
  if [ -d "$WATCH_DIR/$folder" ]; then
    send_msg "🆕 *New user found*\n\n📁 \`$folder\`"
  fi
done
