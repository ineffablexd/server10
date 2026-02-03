#!/bin/bash

BOT_TOKEN="8521980411:AAEND2x3mFbhHRyJMWttAg2slvFi5iI0c_s"
CHAT_ID="-5296141912"

DATA_DIR="data/users"
TEMPLATE_REPO="vltn-tmp"
TEMPLATE_PATH="$TEMPLATE_REPO/template"
OUTPUT_BASE="$TEMPLATE_REPO/generated"
GITHUB_PAGES_BASE="https://ineffablexd.github.io/vltn-tmp/generated"

OFFSET_FILE=".tg_offset"

send_msg () {
  curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
    -d chat_id="$CHAT_ID" \
    -d text="$1" >/dev/null
}

OFFSET=$(cat "$OFFSET_FILE" 2>/dev/null || echo 0)

while true; do
  UPDATES=$(curl -s "https://api.telegram.org/bot$BOT_TOKEN/getUpdates?offset=$OFFSET")

  echo "$UPDATES" | jq -c '.result[]' | while read update; do
    OFFSET=$(echo "$update" | jq '.update_id + 1')
    echo "$OFFSET" > "$OFFSET_FILE"

    TEXT=$(echo "$update" | jq -r '.message.text // empty')

    # Only accept "/generate foldername"
    if [[ "$TEXT" =~ ^/generate[[:space:]]+(.+) ]]; then
      FOLDER="${BASH_REMATCH[1]}"

      USER_DIR="$DATA_DIR/$FOLDER"
      TARGET="$OUTPUT_BASE/$FOLDER"
      LOCK_FILE="$TARGET/.generated"

      # Validation
      if [ ! -d "$USER_DIR" ]; then
        send_msg "❌ User folder not found: $FOLDER"
        continue
      fi

      if [ ! -f "$USER_DIR/strings.json" ]; then
        send_msg "❌ strings.json missing for: $FOLDER"
        continue
      fi

      # Prevent duplicates (hard stop)
      if [ -f "$LOCK_FILE" ]; then
        continue
      fi

      mkdir -p "$OUTPUT_BASE"

      # Copy template
      cp -r "$TEMPLATE_PATH" "$TARGET"

      # Inject images (if any)
      if [ -d "$USER_DIR/images" ]; then
        cp -r "$USER_DIR/images/"* "$TARGET/public/images/" 2>/dev/null
      fi

      # Replace strings.json
      cp "$USER_DIR/strings.json" "$TARGET/public/text/strings.json"

      # Mark as generated (lock)
      touch "$LOCK_FILE"

      # Git operations
      cd "$TEMPLATE_REPO" || exit 1
      git add "generated/$FOLDER"

      git commit -m "Generate Valentine page for $FOLDER" || {
        send_msg "❌ Git commit failed: $FOLDER"
        continue
      }

      git push || {
        send_msg "❌ Git push failed: $FOLDER"
        continue
      }

      LINK="$GITHUB_PAGES_BASE/$FOLDER"

      # CLEAN message (no \n garbage)
      send_msg "💘 Valentine page ready: $LINK"
    fi
  done

  sleep 3
done
