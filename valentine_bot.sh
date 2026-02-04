#!/bin/bash

set -u
shopt -s nullglob

#################################
# CONFIG
#################################

BOT_TOKEN="8521980411:AAEND2x3mFbhHRyJMWttAg2slvFi5iI0c_s"
CHAT_ID="-5296141912"

DATA_DIR="data/users"
TEMPLATE_REPO="vltn-tmp"
TEMPLATE_PATH="$TEMPLATE_REPO/template"
OUTPUT_BASE="$TEMPLATE_REPO/generated"
GITHUB_PAGES_BASE="https://ineffablexd.github.io/vltn-tmp/generated"

OFFSET_FILE=".tg_offset"
MSG_QUEUE="/tmp/tg_queue"
LOCK_SEND="/tmp/tg_send.lock"
LOG_FILE="bot.log"

mkdir -p /tmp
touch "$MSG_QUEUE"
touch "$LOG_FILE"

#################################
# LOGGING
#################################

log() {
  echo "[$(date '+%F %T')] $1" >> "$LOG_FILE"
}

#################################
# CLEAN EXIT
#################################

cleanup() {
  log "Bot stopped"
  exit 0
}

trap cleanup SIGINT SIGTERM

#################################
# SAFE CURL
#################################

safe_curl() {
  for i in {1..5}; do
    curl -s --max-time 30 "$@" && return 0
    sleep 2
  done
  log "curl failed"
  return 1
}

#################################
# ASYNC MESSAGE QUEUE
#################################

send_msg_async() {
  echo "$1" >> "$MSG_QUEUE"
}

telegram_sender() {
  while true; do
    if [ -s "$MSG_QUEUE" ]; then
      exec 9>"$LOCK_SEND"
      flock -n 9 || { sleep 1; continue; }

      MSG=$(head -n 1 "$MSG_QUEUE")
      tail -n +2 "$MSG_QUEUE" > "$MSG_QUEUE.tmp" && mv "$MSG_QUEUE.tmp" "$MSG_QUEUE"

      safe_curl -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
        -d chat_id="$CHAT_ID" \
        -d text="$MSG" >/dev/null

      flock -u 9
      sleep 1
    else
      sleep 0.5
    fi
  done
}

#################################
# WATCH USERS
#################################

watch_users() {
  while true; do
    inotifywait -e create --format '%f' "$DATA_DIR" 2>/dev/null | while read folder
    do
      if [ -d "$DATA_DIR/$folder" ]; then

        MSG="🆕 New user uploaded

Folder:
\`$folder\`

Generate command:
\`/generate $folder\`"

        send_msg_async "$MSG"
        log "New user: $folder"

      fi
    done
    sleep 2
  done
}


#################################
# TELEGRAM LOOP
#################################

OFFSET=$(cat "$OFFSET_FILE" 2>/dev/null || echo 0)

telegram_loop() {

while true; do

  UPDATES=$(safe_curl "https://api.telegram.org/bot$BOT_TOKEN/getUpdates?timeout=45&offset=$OFFSET") || {
    sleep 5
    continue
  }

  echo "$UPDATES" | jq -c '.result[]?' | while read update; do

    OFFSET=$(echo "$update" | jq '.update_id + 1')
    echo "$OFFSET" > "$OFFSET_FILE"

    TEXT=$(echo "$update" | jq -r '.message.text // empty')

    [[ "$TEXT" =~ ^/generate[[:space:]]+(.+) ]] || continue
    FOLDER="${BASH_REMATCH[1]}"

    USER_DIR="$DATA_DIR/$FOLDER"
    TARGET="$OUTPUT_BASE/$FOLDER"
    LOCK_FILE="$TARGET/.generated"

    [ -d "$USER_DIR" ] || continue
    [ -f "$USER_DIR/strings.json" ] || continue
    [ -f "$LOCK_FILE" ] && continue

    log "Generating $FOLDER"

    mkdir -p "$OUTPUT_BASE" || continue
    cp -r "$TEMPLATE_PATH" "$TARGET" || continue

    if [ -d "$USER_DIR/images" ]; then
      cp -r "$USER_DIR/images/"* "$TARGET/public/images/" 2>/dev/null
    fi

    cp "$USER_DIR/strings.json" "$TARGET/public/text/strings.json" || continue

    touch "$LOCK_FILE"

    cd "$TEMPLATE_REPO" || continue

    git add "generated/$FOLDER" || continue

    git commit -m "Generate Valentine page for $FOLDER" >/dev/null || {
      git reset --hard
      continue
    }

    git push >/dev/null || {
      git reset --hard
      continue
    }

    LINK="$GITHUB_PAGES_BASE/$FOLDER"
    send_msg_async "💘 Valentine page ready: $LINK"
    log "Generated $FOLDER"

  done

done

}

#################################
# START
#################################

log "Bot started"

telegram_sender &
watch_users &
telegram_loop
