import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)


DATA_PATH = Path("data/evaluation/exais_normalized.csv")
MODEL_PATH = Path("models/final_phishing_classifier.joblib")
OUTPUT_PATH = Path("data/evaluation/exais_baseline_results.json")


def main():
    df = pd.read_csv(DATA_PATH)

    model = joblib.load(MODEL_PATH)

    y_true = df["label"]
    y_pred = model.predict(df["message"])

    report = classification_report(
        y_true,
        y_pred,
        target_names=["HAM", "SPAM"],
        output_dict=True,
    )

    matrix = confusion_matrix(y_true, y_pred)

    results = {
        "dataset": "ExAIS normalized",
        "records": int(len(df)),
        "model": "TF-IDF + Logistic Regression",
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "spam_precision": float(
            precision_score(y_true, y_pred, pos_label=1)
        ),
        "spam_recall": float(
            recall_score(y_true, y_pred, pos_label=1)
        ),
        "spam_f1": float(
            f1_score(y_true, y_pred, pos_label=1)
        ),
        "macro_f1": float(
            f1_score(y_true, y_pred, average="macro")
        ),
        "errors": int((y_true != y_pred).sum()),
        "confusion_matrix": matrix.tolist(),
        "classification_report": report,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print("ExAIS baseline evaluation complete.")
    print(f"Records: {len(df)}")
    print(f"Accuracy: {results['accuracy']:.4f}")
    print(f"SPAM Precision: {results['spam_precision']:.4f}")
    print(f"SPAM Recall: {results['spam_recall']:.4f}")
    print(f"SPAM F1: {results['spam_f1']:.4f}")
    print(f"Macro F1: {results['macro_f1']:.4f}")
    print(f"Errors: {results['errors']}")
    print(f"Saved: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()