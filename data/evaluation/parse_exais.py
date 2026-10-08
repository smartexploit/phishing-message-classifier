import csv
import glob
from pathlib import Path

SOURCE_DIR = Path("data/evaluation/exais_raw/ExAIS_SMS Spam Dataset")
OUTPUT_FILE = Path("data/evaluation/exais_normalized.csv")


def parse_file(path):
    participant = path.stem

    with open(path, encoding="utf-8", errors="replace", newline="") as f:
        reader = csv.reader(f)

        for row_number, row in enumerate(reader, start=1):
            if len(row) <= 7:
                continue

            source_label = row[6].strip().upper()

            if source_label not in {"HAM", "SPAM"}:
                continue

            # Message starts at column 7.
            # Some messages contain commas and are therefore split
            # across multiple CSV columns.
            message_parts = row[7:]

            # Remove trailing metadata fields such as "spam"/"ham".
            while message_parts and message_parts[-1].strip().lower() in {
                "spam",
                "ham",
            }:
                message_parts.pop()

            # Remove empty trailing fields.
            while message_parts and not message_parts[-1].strip():
                message_parts.pop()

            message = ",".join(part.strip() for part in message_parts).strip()

            if not message:
                continue

            yield {
                "participant": participant,
                "row_number": row_number,
                "message_type": row[0].strip(),
                "direction": row[1].strip(),
                "address": row[2].strip(),
                "contact_id": row[3].strip(),
                "timestamp": row[4].strip(),
                "service_id": row[5].strip(),
                "source_label": source_label,
                "label": 1 if source_label == "SPAM" else 0,
                "message": message,
            }


def main():
    files = sorted(glob.glob(str(SOURCE_DIR / "*.csv")))

    records = []

    for file in files:
        records.extend(parse_file(Path(file)))

    fieldnames = [
        "participant",
        "row_number",
        "message_type",
        "direction",
        "address",
        "contact_id",
        "timestamp",
        "service_id",
        "source_label",
        "label",
        "message",
    ]

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)

    print(f"Files processed: {len(files)}")
    print(f"Records written: {len(records)}")
    print(f"Output: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()