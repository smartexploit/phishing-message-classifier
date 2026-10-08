import pandas as pd
import joblib
from pathlib import Path


DATA_PATH = Path("data/evaluation/exais_normalized.csv")
MODEL_PATH = Path("models/final_phishing_classifier.joblib")


def main():
    df = pd.read_csv(DATA_PATH)

    model = joblib.load(MODEL_PATH)

    df["prediction"] = model.predict(df["message"])
    df["correct"] = df["label"] == df["prediction"]

    errors = df[~df["correct"]].copy()

    false_negatives = errors[
        (errors["label"] == 1) & (errors["prediction"] == 0)
    ]

    false_positives = errors[
        (errors["label"] == 0) & (errors["prediction"] == 1)
    ]

    print("EXAIS ERROR ANALYSIS")
    print("=" * 60)

    print(f"Total records: {len(df)}")
    print(f"Total errors: {len(errors)}")
    print(f"False negatives: {len(false_negatives)}")
    print(f"False positives: {len(false_positives)}")

    print("\n" + "=" * 60)
    print("FALSE NEGATIVES — SPAM classified as HAM")
    print("=" * 60)

    for _, row in false_negatives.head(25).iterrows():
        print(
            f"\n[{row['participant']} | row {row['row_number']}] "
            f"{row['message']}"
        )

    print("\n" + "=" * 60)
    print("FALSE POSITIVES — HAM classified as SPAM")
    print("=" * 60)

    for _, row in false_positives.head(25).iterrows():
        print(
            f"\n[{row['participant']} | row {row['row_number']}] "
            f"{row['message']}"
        )


if __name__ == "__main__":
    main()