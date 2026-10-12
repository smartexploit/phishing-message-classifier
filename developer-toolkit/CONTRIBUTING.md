# Contributing to the ScamShield NG Python Developer Toolkit

Thank you for your interest in contributing.

## Before making changes

1. Read the README and understand the existing API contract.
2. Open an issue or discuss substantial changes before starting work.
3. Keep changes focused and avoid committing credentials, personal data, or unrelated files.

## Development setup

```powershell
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
```

## Contribution expectations

- Add or update tests for changed behavior.
- Preserve the documented `/predict` and `/analyze` response contracts unless a deliberate API change is documented.
- Never commit API tokens, passwords, or other secrets.
- Do not describe test results as verified unless the tests were actually run.
- Submit changes with a clear explanation of the problem and solution.

## Reporting issues

Include the steps to reproduce the issue, the expected behavior, the actual behavior, and relevant sanitized error messages. Do not include private messages, credentials, or sensitive user information.
