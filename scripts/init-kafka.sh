#!/bin/bash

set -e

KAFKA_BIN_PATH="/usr/bin"
KAFKA_BROKER="localhost:9092"

echo "Creating Kafka topics..."

topics=(
  "ticket-purchases"
  "checkin-events"
  "pricing-updates"
  "user-registrations"
)

for topic in "${topics[@]}"
do
  echo "Creating topic: $topic"
  kafka-topics.sh --create --topic "$topic" --bootstrap-server "$KAFKA_BROKER" --replication-factor 1 --partitions 3 || true
done

echo "Kafka topics created or already exist."